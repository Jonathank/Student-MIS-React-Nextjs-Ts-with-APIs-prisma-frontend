"use client";
import FormModal from "@/app/components/FormModal";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import { role } from "@/lib/data";
import { Student } from "@/service/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BiSort } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { FaFilter, FaRegEye } from "react-icons/fa6";
import { fetchStudents } from "@/service/StudentsServices";
import SetPageLimit from "../../../components/SetPageLimit";
import { useRouter, useSearchParams } from "next/navigation";
import { handleLimitChange } from "@/utils/handleLimitChange";
import { handlePageChange } from "@/utils/handlePageChange";

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Student ID",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },

  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden md:table-cell",
  },
  {
    header: "Email",
    accessor: "email",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const renderRow = (item: Student) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#F1F0FF]"
  >
    <td className="flex items-center gap-4 p-4">
      {item.img ? (
        <Image
          src={item.img}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <FaUser className="w-10 h-10 fill-gray-300" />
      )}
      <div className="flex flex-col">
        <h3 className="font-semibold">
          {item.username} {item.surname}
        </h3>
        <p className="text-xs text-gray-500">{item.class.name}</p>
      </div>
    </td>
    <td className="hidden md:table-cell">{item.id}</td>
    <td className="hidden md:table-cell">{item.grade.level}</td>
    <td className="hidden md:table-cell">{item?.phone}</td>
    <td className="hidden lg:table-cell">{item?.email}</td>
    <td className="hidden lg:table-cell">{item.address}</td>
    <td>
      <div className="flex items-center gap-2">
        <Link href={`/lists/students/${item.id}`}>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#C3EBFA]">
            <FaRegEye className="w-5 h-5 fill-blue-400" />
          </button>
        </Link>
        {role === "admin" && (
          <FormModal table="student" type="delete" id={item.id} />
        )}
      </div>
    </td>
  </tr>
);

const StudentsListPage = () => {
  const searchParams = useSearchParams();
  const [students, setStudents] = useState<Student[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  // Handle URL changes for pagination and filters
  const router = useRouter();

  useEffect(() => {
    const getStudents = async () => {
      try {
        setLoading(true);
        const teacherId = searchParams.get("teacherId") || undefined;
        const search = searchParams.get("search") || "";
        const gender = searchParams.get("gender") || undefined;
        const pageParam = parseInt(searchParams.get("page") || "1");
        const limitParam = parseInt(searchParams.get("limit") || "10");
        const classIdParam = searchParams.get("classId")
          ? parseInt(searchParams.get("classId") || "0")
          : undefined;

        
        setPage(pageParam);
        setLimit(limitParam);

        const result = await fetchStudents({
          page: pageParam,
          limit: limitParam,
          classId: classIdParam,
          search,
          gender,
          teacherId,
        });

        console.log("Data type:", typeof result.data);
        console.log("Is Array?", Array.isArray(result.data));
        console.log("Raw data:", result.data);

        // Ensure we set an array
        setStudents(Array.isArray(result.data) ? result.data : []);
        setTotalPages(result.totalPages);

      } catch (err) {
        setError("Failed to fetch Students");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getStudents();
  }, [searchParams]);


  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-[400px] gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-400 border-t-transparent"></div>
        <span className="text-blue-500 text-sm font-medium">
          Loading students details...
        </span>
      </div>
    );

  if (error) return <div className="text-red-500 p-10">{error}</div>;

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/**top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
              <FaFilter />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
              <BiSort />
            </button>
            {role === "admin" && <FormModal table="student" type="create" />}
          </div>
        </div>
      </div>
      {/* Settings Component for Pagination Control */}
      <SetPageLimit limit={limit}onLimitChange={(newLimit) =>
                handleLimitChange(newLimit, searchParams, router)} />
      {/**list */}
      <Table columns={columns} renderRow={renderRow} data={students || []} />
      {/**pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
       onPageChange={(newPage) =>
                 handlePageChange(newPage, totalPages, searchParams, router)
               }
        siblingCount={1}
      />
    </div>
  );
};

export default StudentsListPage;
