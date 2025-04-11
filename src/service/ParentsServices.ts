import { getEntityById } from "@/utils/Generics";
import { Parent } from "./interfaces";

const API_URL = process.env.NEXT_PUBLIC_API_URL;



export const fetchParents2  = async ({ page = 1, limit = 10, search, gender,  }: {
    page?: number;
    limit?: number;
    search?: string;
    gender?: string;
   
}): Promise<{ data: Parent[]; totalPages: number }> => {
    try {
        const params: any = {
            page,
            limit,
        };

        // Append filters only if they're present
        if (search) params.search = search;
        if (gender) params.gender = gender;
        
        const response = await axios.get<any>(`${API_URL}/lists/parents`, {
            params,
        });
        console.log("API Response:", response.data); 

        return {
            data: response.data.data.data,
            totalPages: response.data.data.totalPages,
        };

    } catch (error) {
        console.error("Error fetching Parents:", error);
        return { data: [], totalPages: 1 }; 
    }
};


export const getParentById = async (
    id: string,
    page = 1,
    limit = 10
): Promise<{ parent: Parent; totalPages: number }> => {
    const { data, totalPages } = await getEntityById<Parent>('parents', id, page, limit);
    return { parent: data, totalPages };
};
