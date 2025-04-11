"use client"
import FormModal from "@/app/components/FormModal";
import Pagination from "@/app/components/Pagination";
import SetPageLimit from "@/app/components/SetPageLimit";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import { role, parentsData } from "@/lib/data";
import { Parent, Teacher } from "@/service/interfaces";
import { handleLimitChange } from "@/utils/handleLimitChange";
import { handlePageChange } from "@/utils/handlePageChange";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { BiSort } from "react-icons/bi";
import { FaFilter, FaPlus, FaRegEye, FaSort } from "react-icons/fa6";

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "UserName",
    accessor: "username",
    className: "hidden md:table-cell",
  },

  {
    header: "Gender",
    accessor: "sex",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden md:table-cell",
  },

  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "Students Names",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const renderRow = (item: Parent) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#F1F0FF]"
  >
    <td className="flex items-center gap-4 p-4">
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.surname}</h3>
        <p className="text-xs text-gray-500">{item.email}</p>
      </div>
    </td>
    <td className="hidden md:table-cell">{item.username}</td>
    <td className="hidden md:table-cell">{item.sex}</td>
    <td className="hidden md:table-cell">{item?.phone}</td>
    <td className="hidden lg:table-cell">{item.address}</td>
    <td className="hidden lg:table-cell">{item.students.join(",")}</td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="parent" type="update" data={item} id={item.id} />
            <FormModal table="parent" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const ParentsListPage = () => {
  const searchParams = useSearchParams();
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [totalPages, setTotalPages] = useState<number>(1);
  // Handle URL changes for pagination and filters
  const router = useRouter();
  
  
    
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-[400px] gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-400 border-t-transparent"></div>
        <span className="text-blue-500 text-sm font-medium">
          Loading parents details...
        </span>
      </div>
    );

  if (error) return <div className="text-red-500 p-10">{error}</div>;

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/**top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Parents</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
              <FaFilter />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
              <BiSort />
            </button>
            {role === "admin" && <FormModal table="parent" type="create" />}
          </div>
        </div>
      </div>
      {/* Settings Component for Pagination Control */}
      <SetPageLimit limit={limit} onLimitChange={(newLimit) => handleLimitChange(newLimit, searchParams, router)} />
      {/**list */}
      <Table columns={columns} renderRow={renderRow} data={parentsData} />
      {/**pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={(newPage) => handlePageChange(newPage, totalPages, searchParams, router)}
        siblingCount={1}
      />
    </div>
  );
};

export default ParentsListPage;
