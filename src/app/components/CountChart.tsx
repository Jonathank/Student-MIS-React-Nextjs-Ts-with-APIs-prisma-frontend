"use client"
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
import Image from 'next/image';

const data = [
  {
    name: 'Boys',
    count: 60,
    fill: '#C3EBFA',
  },
  {
    name: 'Girls',
    count: 40,
    fill: '#FAE27C',
    },
  {
    name: 'Total',
    count: 100,
    fill: '#ffffff',
  }
  
];

const CountChart = () => {

    return (
        <div className='bg-white rounded-xl w-full h-full p-4'>

            {/**TITLE */}
            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-semibold'>Students</h1>
                <Image src="/moreDark.png" alt='logo' width={20} height={20} />
            </div>
            {/**Chart */}
            <div className='relative w-full h-[75%]'>
                <ResponsiveContainer>
        <RadialBarChart cx="50%" cy="50%" innerRadius="50%" outerRadius="100%" barSize={32} data={data}>
          <RadialBar
            background
          
            dataKey="count"
          />
        </RadialBarChart>
                </ResponsiveContainer>
                <Image src="/MaleFemale.jpg" alt='' width={40} height={40} className='absolute rounded top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/>
            </div>
            {/**BOTTOM */}
            <div className="flex justify-center gap-16">
                    <div className="flex flex-col gap-1">
                        <div className="w-5 h-5 bg-[#C3EBFA] rounded-full">
                            <h1 className="font-bold">1234</h1>
                            <h2 className="text-sm text-gray-300">Boys(55%)</h2>
                </div>
                </div>
                <div className="flex flex-col gap-1">
                        <div className="w-5 h-5 bg-[#FAE27C] rounded-full">
                            <h1 className="font-bold">1234</h1>
                            <h2 className="text-sm text-gray-300">Girls(45%)</h2>
                </div>
                </div>
                </div>
        </div>
    );
}
 
export default CountChart;