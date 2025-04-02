import FormModal from "@/app/components/FormModal";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import { eventData, role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { BiSort } from "react-icons/bi";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaFilter, FaPlus, FaRegEye, FaSort } from "react-icons/fa6";

const columns = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Class",
    accessor: "class",
  },

  {
    header: "Date",
    accessor: "date",
  },
  {
    header: "Start Time",
    accessor: "startDate",
    className: "hidden md:table-cell",
  },

  {
    header: "End Time",
    accessor: "endDate",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

type Event = {
  id: number;
  title: string;
  class: string;
  date: string;
  startTime: string;
  endTime: string;
};
const EventsListPage = () => {
  const renderRow = (item: Event) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#F1F0FF]"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.title}</h3>
        </div>
      </td>
      <td>{item.class}</td>
      <td>{item.date}</td>
      <td className="hidden md:table-cell">{item.startTime}</td>
      <td className="hidden md:table-cell">{item.endTime}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
            <FormModal table="event" type="update" data={item} id={item.id} />
            <FormModal table="event" type="delete" id={item.id} />
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
        <h1 className="hidden md:block text-lg font-semibold">All Events</h1>
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
                <FormModal table="event" type="create" />
            )}
          </div>
        </div>
      </div>
      {/**list */}
      <Table columns={columns} renderRow={renderRow} data={eventData} />
      {/**pagination */}
      <Pagination />
    </div>
  );
};

export default EventsListPage;
