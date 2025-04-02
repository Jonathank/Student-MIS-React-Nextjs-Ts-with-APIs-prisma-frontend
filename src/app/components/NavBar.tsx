
import Image from "next/image";
import { BiMessageRoundedDots } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaUserLarge } from "react-icons/fa6";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";
import { TbSpeakerphone } from "react-icons/tb";


const NavBar = () => {
    return (
      <div className="flex items-center justify-between p-4">
        {/* SEARCH BAR */}
        <div className="hidden md:flex  items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
          <IoIosSearch className="w-5 h-5" />
          <input
            type="text"
            placeholder="Search..."
            className="w-[200px] p-2 bg-transparent outline-none"
          />
        </div>

        {/* ICON AND USER */}
        <div className="flex items-center gap-6 justify-end w-full">
          <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
            <BiMessageRoundedDots className="w-7 h-7 fill-gray-500" />
            <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-sm">
              1
            </div>
          </div>
          <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
            <HiOutlineSpeakerphone className="w-7 h-7 fill-gray-400" />
            <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-sm">
              1
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium leading-3">
              Kyeyune Jonathan
            </span>
            <span className="text-[10px] text-gray-500 text-right">Admin</span>
          </div>
          <FaUserLarge className="w-7 h-7" color="gray" />
        </div>
      </div>
    );
}

export default NavBar;