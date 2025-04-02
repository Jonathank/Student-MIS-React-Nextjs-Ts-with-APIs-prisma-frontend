

import { IoIosSearch } from "react-icons/io";

const TableSearch = () => {
  return (
      <div className="md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
        <IoIosSearch className="w-5 h-5" />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 bg-transparent outline-none"
        />
      </div>
  );
};

export default TableSearch;
