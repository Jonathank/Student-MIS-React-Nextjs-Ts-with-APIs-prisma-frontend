
import { Subject } from "./interfaces";
import { fetchEntities} from "@/utils/Generics";
import { SubjectFilters } from "@/utils/EntityFilters";


export const fetchSubjects = async ({
    page = 1,
    limit = 10,
    search,
}: SubjectFilters): Promise<{ data: Subject[]; totalPages: number }> => {
    const filters: SubjectFilters = {
        page,
        limit,
    };

    // Append other filters only if they're present
    if (search) filters.search = search;
   
    const { data, totalPages } = await fetchEntities('subjects', filters);
    
    return { data: data as Subject[], totalPages };
    
};
