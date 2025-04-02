"use client"


//temporary data
const announcements = [
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


const Announcement = () => {
     // Only use the first 3 events
    const limitedAnnouncements = announcements.slice(0, 3);
    return (
        <div className="bg-white p-4 rounded-md">
            {/**TITLE */}
             <div className='flex justify-between items-center'>
             <h1 className='text-lg font-semibold'>Announcements</h1>
            <span className="text-sm text-gray-400">View All</span>
            </div>
            <div className="flex flex-col gap-4 mt-4">
                 {limitedAnnouncements.map(event => (
                  <div className="even:bg-[#EDF9FD] odd:bg-[#FEFCE8] rounded-md p-4" key={event.id}>
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

export default Announcement;