"use client"
import Image from "next/image";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const data = [
  {
    name: 'Mon',
    present: 70,
    absent: 30,
  },
  {
    name: 'Tue',
    present: 90,
    absent: 10,
  },
  {
    name: 'Wed',
    present: 80,
    absent: 20,
  },
  {
    name: 'Thu',
    present: 97,
    absent: 3,
  },
  {
    name: 'Fri',
    present: 65,
    absent: 35,
  },
  
];

const AttendanceChart = () => {
    return (
        <div className="bg-white rounded-lg p-4 h-full">
            {/**title */}
             <div className='flex justify-between items-center'>
             <h1 className='text-lg font-semibold'>Attendance</h1>
            <Image src="/moreDark.png" alt='logo' width={20} height={20} />
            </div>
            {/**chart */}
            <div className="w-full h-[85%]">
                 <ResponsiveContainer >
        <BarChart
          width={500}
          height={300}
          data={data}
         barSize={20}
        >
        <CartesianGrid strokeDasharray="3 3" vertical={ false} stroke="#ddd" />
         <XAxis dataKey="name" axisLine={false} tick={{fill:"#dld5db"}} tickLine={false } />
          <YAxis  axisLine={false }  tick={{fill:"#dld5db"}} tickLine={false }/>
          <Tooltip contentStyle={{borderRadius:"10px",borderColor:"lightgray"}}/>
          <Legend align="left" verticalAlign="top" wrapperStyle={{paddingTop:"20px",paddingBottom:"40px"}}/>
          <Bar dataKey="present" fill="#C3EBFA" legendType="circle" radius={[10,10,0,0]}/>
          <Bar dataKey="absent" fill="#FAE27C"   legendType="circle"  radius={[10,10,0,0]}/>
        </BarChart>
      </ResponsiveContainer>
            </div>
            {/**bottom chart */}
            <div className="">

            </div>
         </div>
    );
}

export default AttendanceChart;