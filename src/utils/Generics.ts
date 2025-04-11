import axios from "axios";
import { EntityMap } from "./Types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getEntityById = async <T>(
    entityName: string,
    id: string,
    page = 1,
    limit = 10
): Promise<{ data: T; totalPages: number }> => {
    try {
        const response = await axios.get<any>(`${API_URL}/lists/${entityName}/${id}`, {
            params: { page, limit },
        });

        const data = response.data.data.data as T;
        const totalPages = response.data.data.totalPages;

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
    // Return an array of the entity's data type
    data: EntityMap[E]["data"][];
    totalPages: number
}> => {
    try {
        const endpoint = `${API_URL}/lists/${entity}`;

        const response = await axios.get<{
            data: {
                data: EntityMap[E]["data"][];
                totalPages: number
            }
        }>(endpoint, {
            params: filters
        });

        return {
            data: response.data.data.data,
            totalPages: response.data.data.totalPages,
        };
    } catch (error) {
        console.error(`Error fetching ${entity}s:`, error);
        return { data: [], totalPages: 1 };
    }
};