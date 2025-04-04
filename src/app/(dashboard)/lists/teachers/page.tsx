"use client"
import { useEffect, useState } from "react";
import FormModal from "@/app/components/FormModal";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { BiSort } from "react-icons/bi";
import { FaFilter, FaRegEye, FaUser } from "react-icons/fa6";
import { fetchTeachers, Teacher } from "@/service/teacherService";
import Settings from "../../settings/page";

const columns = [
  { header: "Info", accessor: "info" },
  { header: "Teacher ID", accessor: "id", className: "hidden lg:table-cell" },
  { header: "Gender", accessor: "sex", className: "hidden md:table-cell" },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
  { header: "Classes", accessor: "classes", className: "hidden lg:table-cell" },
  {
    header: "Subjects",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },
  { header: "Actions", accessor: "action" },
];

const TeachersListPage = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getTeachers = async () => {
      try {
        setLoading(true);
        const { data, totalPages } = await fetchTeachers(page, limit);
        setTeachers(data);
        setTotalPages(totalPages);
      } catch (err) {
        setError("Failed to fetch teachers");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getTeachers();
  }, [page, limit]); // Re-fetch when `page` or `limit` changes

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page when changing limit
  };

  const renderRow = (item: Teacher) => (
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
          <p className="text-xs text-gray-500">{item?.email || "N/A"}</p>
        </div>
      </td>
      <td className="hidden lg:table-cell">{item.id}</td>
      <td className="hidden lg:table-cell">{item.sex}</td>
      <td className="hidden lg:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">
        {item.classes.map((clas) => clas.name).join(", ")}
      </td>
      <td className="hidden md:table-cell">
        {item.subjects.map((subject) => subject.name).join(", ")}
      </td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/lists/teachers/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#C3EBFA]">
              <FaRegEye className="w-5 h-5 fill-blue-400" />
            </button>
          </Link>
          {role === "admin" && (
            <FormModal table="teacher" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );

  if (loading)
    return <div className="flex justify-center p-10">Loading...</div>;
  if (error) return <div className="text-red-500 p-10">{error}</div>;

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
              <FaFilter />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
              <BiSort />
            </button>
            {role === "admin" && <FormModal table="teacher" type="create" />}
          </div>
        </div>
      </div>

      {/* Settings Component for Pagination Control */}
      <Settings limit={limit} onLimitChange={setLimit} />
      {/* Table */}
      <Table columns={columns} renderRow={renderRow} data={teachers} />

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TeachersListPage;
