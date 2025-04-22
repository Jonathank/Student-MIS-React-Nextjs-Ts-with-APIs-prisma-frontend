
import { Student } from "./interfaces";
import { fetchEntities, getEntityById } from "@/utils/Generics";
import { StudentFilters } from "@/utils/EntityFilters";


export const getStudentById = async (
    id: string,
    page = 1,
    limit = 10
): Promise<{ student: Student | undefined; totalPages: number }> => {
    const { data, totalPages } = await getEntityById<Student>('students', id, page, limit);

    return { student: data, totalPages };
};



export const fetchStudents = async ({
    page = 1,
    limit = 10,
    search,
    gender,
    classId,
    teacherId,
}: StudentFilters): Promise<{ data: Student[]; totalPages: number }> => {
    const filters: StudentFilters = {
        page,
        limit,
    };

    // Append other filters only if they're present
    if (search) filters.search = search;
    if (gender) filters.gender = gender;
    if (classId !== undefined) filters.classId = classId;
    if (teacherId !== undefined) filters.teacherId = teacherId;

    const { data, totalPages } = await fetchEntities('students', filters);
    console.log("Raw API response in service:", data);

    return { data: data as Student[], totalPages };
    
};
