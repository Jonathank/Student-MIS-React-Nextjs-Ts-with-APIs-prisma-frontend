import Link from "next/link";
import Image from "next/image";
import { role } from "@/lib/data";
import { IoHome } from "react-icons/io5";
import React from "react";
import { GiTeacher } from "react-icons/gi";
import { PiExamBold, PiStudentBold } from "react-icons/pi";
import { RiParentFill } from "react-icons/ri";
import { MdAssignment, MdLogout, MdMessage, MdPlayLesson, MdSubject } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { FaChartLine, FaRegCalendarAlt, FaRegCalendarCheck, FaUserGraduate } from "react-icons/fa";
import { GrAnnounce } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { TfiAnnouncement } from "react-icons/tfi";
import { TbSpeakerphone } from "react-icons/tb";


const MenuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: <IoHome />,
        label: "Home",
        href: "/admin",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <GiTeacher />,
        label: "Teachers",
        href: "/lists/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: <FaUserGraduate />,
        label: "Students",
        href: "/lists/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: <RiParentFill />,
        label: "Parents",
        href: "/lists/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: <MdSubject />,
        label: "Subjects",
        href: "/lists/subjects",
        visible: ["admin"],
      },
      {
        icon: <SiGoogleclassroom />,
        label: "Classes",
        href: "/lists/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: <MdPlayLesson />,
        label: "Lessons",
        href: "/lists/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: <PiExamBold />,
        label: "Exams",
        href: "/lists/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <MdAssignment />,
        label: "Asignments",
        href: "/lists/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <FaChartLine />,
        label: "Results",
        href: "/lists/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <FaRegCalendarCheck />,
        label: "Attendance",
        href: "/lists/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <FaRegCalendarAlt />,
        label: "Events",
        href: "/lists/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <MdMessage />,
        label: "Messages",
        href: "/lists/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <TbSpeakerphone />,
        label: "Updates",
        href: "/lists/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: <CgProfile />,
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <IoMdSettings />,
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <MdLogout />,
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];


const Menu = () => {
    return (
        <div className="mt-4 text-sm">
            {MenuItems.map(i => (
                <div className="flex flex-col gap-2" key={i.title}>
                    <span className="hidden lg:block text-gray-400 font-light my-4">{i.title}</span>
                    {i.items.map((item) => {
                        if (item.visible.includes(role)) {
                            return (
                            <Link href={item.href} key={item.label} className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 rounded-md md:p-2 hover:bg-[#EDF9FD]">
                           {typeof item.icon === "string" ? (
                             <Image src={item.icon} alt="icon" width={35} height={35}/>
                                ) : (
                              React.cloneElement(item.icon, { className: "w-7 h-7" })
                               )}
                            <span className="hidden lg:block">{item.label }</span>
                           </Link>
                            )
                        }
                    })}
                </div>
            ))}
        </div>
    )
}

export default Menu;