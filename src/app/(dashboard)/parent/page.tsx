import Announcement from "@/app/components/Announcements"
import BigCalendar from "@/app/components/BigCalendar"
import EventCalender from "@/app/components/EventCalender";


const ParentPage = () => {
     return (
       <div className="p-4 flex gap-4 flex-col md:flex-row h-screen">
         {/** Left Side - Big Calendar */}
         <div className="w-full md:w-2/3 flex flex-col gap-8">
           <div className="flex-grow bg-white p-4 rounded-md flex flex-col">
             <h1 className="text-xl font-semibold">Schedule (Kyeyune Jonathan)</h1>
             <div className="flex-grow overflow-auto h-[150vh]">
               <BigCalendar />
             </div>
           </div>
         </div>

         {/** Right Side - Announcements */}
         <div className="w-full md:w-1/3">
           <div className="flex-grow overflow-auto">
             <Announcement />
           </div>
         </div>
       </div>
     );
}


export default ParentPage;