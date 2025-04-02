import FormModal from "@/app/components/FormModal";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import { parentsData, role, studentsData, teachersData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { BiSort } from "react-icons/bi";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
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

type Parent = {
  id: string;
  username: string;
  surname: string;
  email?: string;
  phone: string;
  address: string;
  img?: string;
  bloodType: string;
  sex: "MALE" | "FEMALE"; // Assuming UserSex is an enum with these values
  students:string[]; // Replace 'any[]' with your actual Student type if available
};
const ParentsListPage = () => {
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
              <FormModal
                table="parent"
                type="update"
                data={item}
                id={item.id}
              />
              <FormModal table="parent" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
    
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
            {role === "admin" && (
              <FormModal table="parent" type="create" />
            )}
          </div>
        </div>
      </div>
      {/**list */}
      <Table columns={columns} renderRow={renderRow} data={parentsData} />
      {/**pagination */}
      <Pagination />
    </div>
  );
};

export default ParentsListPage;
