"use client";

import { role } from "@/lib/data";
import { Subject } from "@/service/interfaces";
import { fetchSubjects } from "@/service/SubjectsServices";
import { handleLimitChange } from "@/utils/handleLimitChange";
import { handlePageChange } from "@/utils/handlePageChange";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { BiSort } from "react-icons/bi";
import { FaFilter } from "react-icons/fa6";
import FormModal from "@/app/components/FormModal";
import Pagination from "@/app/components/Pagination";
import SetPageLimit from "@/app/components/SetPageLimit";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";

const columns = [
  {
    header: "SubjectName",
    accessor: "name",
  },

  {
    header: "Teachers",
    accessor: "teachers",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];
const renderRow = (item: Subject) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#F1F0FF]"
  >
    <td className="flex items-center gap-4 p-4">
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.name}</h3>
      </div>
    </td>
    <td className="hidden md:table-cell">
      {item.teachers
        .map((teacher) => teacher.username + " " + teacher.surname)
        .join(",")}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="subject" type="update" data={item} id={item.id} />
            <FormModal table="subject" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const SubjectsListPage = () => {
  const searchParams = useSearchParams();
  const [subjects, setSubjects] = useState<Subject[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  // Handle URL changes for pagination and filters
  const router = useRouter();

  useEffect(() => {
    const getSubjects = async () => {
      try {
        setLoading(true);
        const search = searchParams.get("search") || "";
        const pageParam = parseInt(searchParams.get("page") || "1");
        const limitParam = parseInt(searchParams.get("limit") || "10");

        setPage(pageParam);
        setLimit(limitParam);

        const result = await fetchSubjects({
          page: pageParam,
          limit: limitParam,
          search,
        });

        // Ensure we set an array
        setSubjects(Array.isArray(result.data) ? result.data : []);
        setTotalPages(result.totalPages);
      } catch (err) {
        setError("Failed to fetch Subjects");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getSubjects();
  }, [searchParams]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-[400px] gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-400 border-t-transparent"></div>
        <span className="text-blue-500 text-sm font-medium">
          Loading subjects details...
        </span>
      </div>
    );

  if (error) return <div className="text-red-500 p-10">{error}</div>;

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/**top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          Subjects And Teachers
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
              <FaFilter />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
              <BiSort />
            </button>
            {role === "admin" && <FormModal table="subject" type="create" />}
          </div>
        </div>
      </div>
      {/* Settings Component for Pagination Control */}
      <SetPageLimit
        limit={limit}
        onLimitChange={(newLimit) =>
          handleLimitChange(newLimit, searchParams, router)
        }
      />
      {/**list */}
      <Table columns={columns} renderRow={renderRow} data={subjects || []} />
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

export default SubjectsListPage;
