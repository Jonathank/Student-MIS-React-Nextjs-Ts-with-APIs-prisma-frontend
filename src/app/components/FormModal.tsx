"use client";
import React, { JSX, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaTrashAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
//import TeacherForm from "./forms/TeacherForm";
import dynamic from "next/dynamic";
import StudentForm from "./forms/StudentForm";

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
    loading:()=><h1>Loading....</h1>
});

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | String;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-[#FAE27C]"
      : type === "update"
      ? "bg-[#C3EBFA]"
      : "bg-[#CFCEFF]";

  const iconMap = {
    create: <FaPlus className="w-4 h-4 text-black" />, // Plus icon for create
    update: <FaEdit className="w-5 h-5  fill-blue-400" />, // Edit icon for update
    delete: <FaTrashAlt className="w-5 h-5 fill-red-300" />, // Trash icon for delete
    };
    const forms: {
      [key: string]: (type: "create" | "update", data?: any) => JSX.Element;
    } = {
      teacher: (type, data) => <TeacherForm type={type} data={data} />,
      student: (type, data) => <StudentForm type={type} data={data} />,
      //teacher: (type, data)=> <TeacherForm type={type} data={data}/>  all others well
    };
    const Form = () => {
        return type === "delete" && id ? (
            <form action="" className="p-4 flex flex-col gap-4">
                <span className="text-center font-medium">All data will be lost. Are you sure you want to delete this {table}?</span>
                <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">Delete</button>
            </form>
        ) : type === "create" || type  ==="update"? (
                forms[table](type,data)
            //<TeacherForm type={type as "create" | "update"} data={data}/>
        ) : ("Form not found!");
    }

    const [open, setOpen] = useState(false);

    return (
      <>
        <button
          className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
          onClick={() => setOpen(true)}
        >
          {iconMap[type]} {/* Rendering the appropriate icon */}
        </button>
        {open && (
          <div className="w-screen h-screen absolute left-0 top-0 bg-black/60 z-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
                    <Form/>
              <div className="absolute top-4 right-4 cursor-pointer " onClick={()=>{setOpen(false)}}>
                <IoClose className="w-6 h-6"/>
              </div>
            </div>
          </div>
        )}
      </>
    );
};

export default FormModal;
