import Announcement from "@/app/components/Announcements"
import AttendanceChart from "@/app/components/AttendanceChart"
import CountChart from "@/app/components/CountChart"
import EventCalender from "@/app/components/EventCalender"
import FinanceChart from "@/app/components/FinanceChart"
import UserCard from "@/app/components/UserCard"

const AdminPage = () => {
    return (
        <div className='p-4 flex gap-4 flex-col md:flex-row'>
            {/**left */}
            <div className="w-full lg:w-2/3 flex flex-col gap-8 ">
                {/**UserCard */}
                <div className="flex  gap-4 justify-between flex-wrap">
                    <UserCard type="student" />
                    <UserCard type="teacher" />
                    <UserCard type="parent" />
                    <UserCard type="staff"/>
                </div>
                {/**MIDDLE CHART */}
                <div className="flex gap-4  flex-col lg:flex-row">
                    {/**COUNT CHART */}
                    <div className="w-full lg:w-1/3 h-[470px]">
                        <CountChart/>
                        </div>

                     {/**ATTENDANCE  CHART */}
                    <div className="w-full lg:w-2/3 h-[470px] ">
                        <AttendanceChart/>
                    </div>
                </div>
                
                {/**BOTTOM CHARTT */}
                <div className="w-full h-[540px]">
                    <FinanceChart/>
                </div>
            </div>

            {/**right */}
            <div className="w-full lg:w-1/3 flex flex-col gap-8">
                <EventCalender />
                <Announcement/>
            </div>
        </div>
    )
}

export default AdminPage