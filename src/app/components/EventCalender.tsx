"use client"
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Image from 'next/image';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

//temporary data
const events = [
    {
        id: 1,
        title: "Science Fair",
        time: "2025-04-10 10:00 AM",
        description: "A showcase of students' science projects and experiments in the school auditorium."
    },
    {
        id: 2,
        title: "Sports Day",
        time: "2025-05-05 08:00 AM",
        description: "A full day of athletic competitions, including races, relays, and team sports on the school field."
    },
    {
        id: 3,
        title: "Parent-Teacher Meeting",
        time: "2025-06-15 03:00 PM",
        description: "A meeting where parents discuss students' progress with teachers in assigned classrooms."
    },
    {
        id: 4,
        title: "End-of-Year Concert",
        time: "2025-07-20 06:00 PM",
        description: "A musical performance featuring the school choir and band in the auditorium."
    }
];

const EventCalender = () => {
    const [value, onChange] = useState<Value>(new Date());
    
    // Only use the first 3 events
    const limitedEvents = events.slice(0, 3);
    
    return (
        <div className="bg-white p-4 rounded-md">
            <Calendar onChange={onChange} value={value}  locale="en-US" />
            {/**TITLE */}
            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-semibold my-4'>Events</h1>
                <Image src="/moreDark.png" alt='logo' width={20} height={20} />
            </div>
            <div className='flex flex-col gap-4'>
                {limitedEvents.map(event => (
                    <div className='p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-[#C3EBFA] even:border-t-[#CFCEFF]' key={event.id}>
                        {/**title */}
                        <div className='flex items-center justify-between'>
                            <h1 className='font-semibold text-gray-600'>{event.title}</h1>
                            <span className='text-gray-300 text-xs'>{event.time}</span>
                        </div>
                        {/**description */}
                        <div className=''>
                            <p className='mt-2 text-gray-400 text-sm'>{event.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EventCalender;