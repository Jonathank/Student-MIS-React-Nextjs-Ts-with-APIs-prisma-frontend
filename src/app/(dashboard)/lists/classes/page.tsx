import FormModal from "@/app/components/FormModal";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import { classData,role} from "@/lib/data";
import Link from "next/link";
import { BiSort } from "react-icons/bi";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaFilter, FaPlus, FaRegEye, FaSort } from "react-icons/fa6";

const columns = [
  {
    header: "Class Name",
    accessor: "name",
  },
  {
    header: "Capacity",
    accessor: "capacity",
  },

  {
    header: "Supervisor",
    accessor: "supervisorId",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

type Class = {
  id: number;
  name: string;
  capacity: number;
  supervisorId: string | null;
};
const ClassesListPage = () => {
  const renderRow = (item: Class) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#F1F0FF]"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
        </div>
      </td>
      <td >{item.capacity}</td>
      <td >{item.supervisorId}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
             <>
            <FormModal table="class" type="update" data={item} id={item.id} />
            <FormModal table="class" type="delete" id={item.id} />
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
        <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
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
                <FormModal table="class" type="create"/>
            )}
          </div>
        </div>
      </div>
      {/**list */}
      <Table columns={columns} renderRow={renderRow} data={classData} />
      {/**pagination */}
      <Pagination />
    </div>
  );
};

export default ClassesListPage;
