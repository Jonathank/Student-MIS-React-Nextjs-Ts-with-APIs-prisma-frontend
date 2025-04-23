import { fetchEntities, getEntityById } from "@/utils/Generics";
import { Parent} from "./interfaces";
import { ParentFilters } from "@/utils/EntityFilters";

export const getparentById = async (
    id: string,
    page = 1,
    limit = 10
): Promise<{ parent: Parent | undefined; totalPages: number }> => {
    const { data, totalPages } = await getEntityById<Parent>('parents', id, page, limit);

    return { parent: data, totalPages };
};


export const fetchParents = async ({
    page = 1,
    limit = 10,
    search,
    gender,
}: ParentFilters): Promise<{ data: Parent[]; totalPages: number }> => {
    const filters: ParentFilters = {
        page,
        limit,
    };

    // Append other filters only if they're present
    if (search) filters.search = search;
    if (gender) filters.gender = gender;
    
    const { data, totalPages } = await fetchEntities('parents', filters);
    return { data: data as Parent[], totalPages };
    
};

