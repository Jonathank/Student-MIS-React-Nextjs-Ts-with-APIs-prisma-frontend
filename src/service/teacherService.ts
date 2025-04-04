
import axios from "axios";
import { Teacher } from "./interfaces";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchTeachers = async (page = 1, limit = 10): Promise<{ data: Teacher[]; totalPages: number }> => {
    try {
        const response = await axios.get<any>(`${API_URL}/lists/teachers`, {
            params: { page, limit }
        });
        console.log("API Response:", response.data); 

        return {
            data: response.data.data.data,
            totalPages: response.data.data.totalPages,
        };

    } catch (error) {
        console.error("Error fetching teachers:", error);
        return { data: [], totalPages: 1 }; 
    }
};


export const getTeacherById = async (id: string): Promise<Teacher> => {
    try {
        const response = await axios.get<{ data: Teacher }>(`${API_URL}/teachers/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching teacher with id ${id}:`, error);
        throw error;
    }
};