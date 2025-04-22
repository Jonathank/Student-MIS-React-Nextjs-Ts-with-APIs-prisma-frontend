import axios from "axios";
import { EntityMap } from "./Types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getEntityById = async <T>(
    entityName: string,
    id: string,
    page = 1,
    limit = 10
): Promise<{ data: T | undefined; totalPages: number }> => {
    try {
        const response = await axios.get<any>(`${API_URL}/lists/${entityName}/${id}`, {
            params: { page, limit },
        });
        console.log("Raw API response:", response.data);

        const data = response.data.data.data as T ||  undefined;
        const totalPages = response.data.data.data.totalPages;

        console.log("Extracted data:", data);
        console.log("Total pages:", totalPages);
        return {
            data,
            totalPages,
        };
    } catch (error) {
        console.error(`Error fetching ${entityName} with id ${id}:`, error);
        throw error;
    }
};

export const fetchEntities = async <E extends keyof EntityMap>(
    entity: string,
    filters: EntityMap[E]["filters"]
): Promise<{
    data: EntityMap[E]["data"][];
    totalPages: number
}> => {
    try {
        const endpoint = `${API_URL}/lists/${entity}`;

        // Define a more flexible response type
        const response = await axios.get<any>(endpoint, {
            params: filters
        });

        console.log("API Response:", response.data);

        // Handle different response structures
        let extractedData: any[] = [];
        let totalPages = 1;

        // Check various possible paths to the data
        if (response.data?.data?.data && Array.isArray(response.data.data.data)) {
            extractedData = response.data.data.data;
            totalPages = response.data.data.totalPages || 1;
        } else if (response.data?.data && Array.isArray(response.data.data)) {
            extractedData = response.data.data;
            totalPages = response.data.totalPages || 1;
        } else if (Array.isArray(response.data)) {
            extractedData = response.data;
        }

        return {
            data: extractedData as EntityMap[E]["data"][],
            totalPages: totalPages,
        };
    } catch (error) {
        console.error(`Error fetching ${entity}s:`, error);
        return { data: [], totalPages: 1 };
    }
};
