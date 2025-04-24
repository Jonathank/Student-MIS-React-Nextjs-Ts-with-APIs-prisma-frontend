"use client";
import Announcement from "@/app/components/Announcements";
import BigCalendar from "@/app/components/BigCalendar";
import FormModal from "@/app/components/FormModal";
import PerformanceChart from "@/app/components/PerformanceChart";
import { getTeacherById } from "@/service/teacherService";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

const SingleTeacherPage = () => {

   const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [teacher, setTeacher] = useState<any>(null);
  
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  
  useEffect(() => {
    if (!id) return; // prevent fetch if id is undefined
  
    const getTeacher = async () => {
      try {
        setLoading(true);
        const { teacher, totalPages } = await getTeacherById(id, page, limit);
        setTeacher(teacher);
        setTotalPages(totalPages);
      } catch (err) {
        setError("Failed to fetch teacher");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    getTeacher();
  }, [id, page, limit]);
  
   if (loading)
     return (
       <div className="flex flex-col items-center justify-center h-[400px] gap-4">
         <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-400 border-t-transparent"></div>
         <span className="text-blue-500 text-sm font-medium">
           Loading teacher personal details...
         </span>
       </div>
     );
  
    if (error) return <div className="text-red-500 p-10">{error}</div>;
  
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/**left */}
      <div className="w-full xl:w-2/3">
        {/**top */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/**user info card */}
          <div className="bg-[#C3EBFA] py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              {teacher.img ? (
                <Image
                  src={teacher.img}
                  alt="teacher Img"
                  width={144}
                  height={144}
                  className="w-36 h-36 rounded-full object-cover"
                />
              ) : (
                <FaUser className="w-20 h-20 fill-gray-300" />
              )}
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">Kyeyune Jonathan</h1>
                <FormModal
                  table="teacher"
                  type="update"
                  data={{
                    id: 1,
                    teacherId: "TCH001",
                    firstName: "Alice Johnson",
                    sex: "Male",
                    email: "alice.johnson@example.com",
                    photo: "/avator.png",
                    phone: "123-456-7890",
                    subjects: ["Mathematics", "Physics"],
                    classes: ["10A", "11B"],
                    address: "123 Main St, Anytown",
                  }}
                />
              </div>
              <p className="text-sm text-gray-500">
                Java developer with experience in full-stack development,
                specializing in Spring Framework
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="" alt="icon" width={14} height={14} />
                  <span>A+</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="" alt="icon" width={14} height={14} />
                  <span>April 2025</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="" alt="icon" width={14} height={14} />
                  <span>jonathan@gmail.com</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="" alt="icon" width={14} height={14} />
                  <span>+256 788566452</span>
                </div>
              </div>
            </div>
          </div>
          {/**smallcard */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/**card */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src=""
                alt="attend"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            {/**card */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src=""
                alt="attend"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">6</h1>
                <span className="text-sm text-gray-400">Branches</span>
              </div>
            </div>
            {/**card */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src=""
                alt="attend"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">6</h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
            {/**card */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src=""
                alt="attend"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">6</h1>
                <span className="text-sm text-gray-400">Classes</span>
              </div>
            </div>
          </div>
        </div>
        {/**bottom */}
        <div className="bg-white rounded-md p-4 h-[800px] mt-4">
          <h1 className="">Teacher's Schedule</h1>
          <BigCalendar />
        </div>
      </div>
      {/**right */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link
              href={`/lists/classes?supervisorId=${teacher?.id || ""}`}
              className="p-3 rounded-md bg-[#EDF9FD]"
            >
              Teacher's Classes
            </Link>
            <Link
              href={`/lists/students?teacherId=${teacher?.id || ""}`}
              className="p-3 rounded-md bg-[#F1F0FF]"
            >
              Teacher'sStudents
            </Link>

            <Link
              href={`/lists/lessons?teacherId=${teacher?.id || ""}`}
              className="p-3 rounded-md bg-[#FEFCE8]"
            >
              My Lessons
            </Link>
            <Link
              href={`/lists/exams?teacherId=${teacher?.id || ""}`}
              className="p-3 rounded-md bg-pink-50"
            >
              Teacher's Exams
            </Link>
            <Link
              href={`/lists/assignments?teacherId=${teacher?.id || ""}`}
              className="p-3 rounded-md bg-[#EDF9FD]"
            >
              Teacher's Assignments
            </Link>
          </div>
        </div>
        <PerformanceChart />
        <Announcement />
      </div>
    </div>
  );
};

export default SingleTeacherPage;
