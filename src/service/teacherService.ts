
import { Teacher } from "./interfaces";
import { fetchEntities, getEntityById } from "@/utils/Generics";
import { TeacherFilters } from "@/utils/EntityFilters";


export const getTeacherById = async (
    id: string,
    page = 1,
    limit = 10
): Promise<{ teacher: Teacher | undefined; totalPages: number }> => {
    const { data, totalPages } = await getEntityById<Teacher>('teachers', id, page, limit);
    return { teacher: data, totalPages };
};


export const fetchTeachers = async ({
    page = 1,
    limit = 10,
    search,
    gender,
    classId,
}: TeacherFilters): Promise<{ data: Teacher[]; totalPages: number }> => {
    const filters: TeacherFilters = {
        page,
        limit,
    };

    if (search) filters.search = search;
    if (gender) filters.gender = gender;
    if (classId !== undefined) filters.classId = classId;

    const { data, totalPages } = await fetchEntities('teachers', filters);
    return { data: data as Teacher[], totalPages };
    
};
