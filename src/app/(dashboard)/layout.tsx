import Link from "next/link";
import Image from "next/image";
import Menu from "../components/Menu";
import NavBar from "../components/NavBar";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-screen flex">
      {/** Left Sidebar */}
      <div className="w-[20%] md:w-[8%] lg:w-[16%]  xl:w-[14%] p-4 h-screen flex flex-col overflow-auto">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image src="/mylogo.png" alt="logo" width={40} height={40} className="rounded-full "/>
          <span className="hidden lg:block font-bold">JK-NANA SCH</span>
        </Link>
        <Menu />
      </div>

      {/** Right Section */}
      <div className="w-[80%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA]  flex flex-col h-screen overflow-auto">
        <NavBar />
        <div className="flex-grow overflow-auto">{children}</div>
      </div>
    </div>
  );
}
