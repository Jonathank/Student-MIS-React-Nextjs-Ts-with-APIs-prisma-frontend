"use client";
import Announcement from "@/app/components/Announcements";
import BigCalendar from "@/app/components/BigCalendar";
import FormModal from "@/app/components/FormModal";
import PerformanceChart from "@/app/components/PerformanceChart";
import { getStudentById } from "@/service/StudentsServices";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FaBirthdayCake, FaPhoneAlt, FaUser } from "react-icons/fa";
import { IoIosPerson } from "react-icons/io";
import { MdOutlineBloodtype, MdOutlineMailOutline } from "react-icons/md";

const SingleStudentPage = () => {
 const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [student, setStudent] = useState<any>(null);

const params = useParams();
const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

useEffect(() => {
  if (!id) return; // prevent fetch if id is undefined

  const getStudent = async () => {
    try {
      setLoading(true);
      const { student, totalPages } = await getStudentById(id, page, limit);
      setStudent(student);
      setTotalPages(totalPages);
    } catch (err) {
      setError("Failed to fetch Student");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  getStudent();
}, [id, page, limit]);

 if (loading)
   return (
     <div className="flex flex-col items-center justify-center h-[400px] gap-4">
       <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-400 border-t-transparent"></div>
       <span className="text-blue-500 text-sm font-medium">
         Loading student personal details...
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
              {student.img ? (
                <Image
                  src={student.img}
                  alt="student Img"
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
                <h1 className="text-xl font-semibold">
                  {student.username} {student.surname}
                </h1>
                <FormModal
                  table="student"
                  type="update"
                  data={{
                    id: student.id,
                    studentId:student.studentId,
                    username: student.username,
                    surname: student.surname,
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
                Std-ID: {student.id} class : {student.class.name} Grade:{" "}
                {student.grade.level}
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <MdOutlineBloodtype className="w-5 h-5 fill-gray-400" />
                  <span>{student.bloodType}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <IoIosPerson className="w-5 h-5 fill-gray-400" />
                  <span>{student.sex}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <MdOutlineMailOutline className="w-5 h-5 fill-gray-400" />
                  <span>{student?.email}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <FaPhoneAlt className="w-5 h-5 fill-gray-400" />
                  <span>{student?.phone}</span>
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
                <h1 className="text-xl font-semibold">{student.grade.level}</h1>
                <span className="text-sm text-gray-400">Grade</span>
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
                <h1 className="text-xl font-semibold">17</h1>
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
                <h1 className="text-xl font-semibold">{student.class.name}</h1>
                <span className="text-sm text-gray-400">Class</span>
              </div>
            </div>
          </div>
        </div>
        {/**bottom */}
        <div className="bg-white rounded-md p-4 h-[800px] mt-4">
          <h1 className="">Student's Schedule</h1>
          <BigCalendar />
        </div>
      </div>
      {/**right */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link href="" className="p-3 rounded-md bg-[#EDF9FD]">
              Student's Lessons
            </Link>
            <Link
              href={`/lists/teachers?classId=${student?.classId || ""}`}
              className="p-3 rounded-md bg-[#F1F0FF]"
            >
              Student's Teachers
            </Link>
            <Link href="" className="p-3 rounded-md bg-[#FEFCE8]">
              Student's Results
            </Link>
            <Link href="" className="p-3 rounded-md bg-pink-50">
              Student's Exams
            </Link>
            <Link href="" className="p-3 rounded-md bg-[#EDF9FD]">
              Student's Assignments
            </Link>
          </div>
        </div>
        <PerformanceChart />
        <Announcement />
      </div>
    </div>
  );
};

export default SingleStudentPage;
