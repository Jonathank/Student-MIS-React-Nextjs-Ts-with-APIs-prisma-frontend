
import { Class } from "./interfaces";
import { fetchEntities} from "@/utils/Generics";
import { ClassFilters } from "@/utils/EntityFilters";


export const fetchClasses = async ({
    page = 1,
    limit = 10,
    search,
    supervisorId,
}: ClassFilters): Promise<{ data: Class[]; totalPages: number }> => {
    const filters: ClassFilters = {
        page,
        limit,
        supervisorId,
    };

    // Append other filters only if they're present
    if (search) filters.search = search;
   
    const { data, totalPages } = await fetchEntities('classes', filters);
    
    return { data: data as Class[], totalPages };
    
};
