


import axios from "axios";
import { Student } from "./interfaces";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchStudents = async (page = 1, limit = 10): Promise<{ data: Student[]; totalPages: number }> => {
    try {
        const response = await axios.get<any>(`${API_URL}/lists/students`, {
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

export const getStudentById = async (
    id: string,
    page = 1,
    limit = 10
): Promise<{ student: Student; totalPages: number }> => {
    try {
        const response = await axios.get<any>(`${API_URL}/lists/students/${id}`, {
            params: { page, limit },
        });

        const student = response.data.data.data;
        const totalPages = response.data.data.totalPages;

        return {
            student,
            totalPages,
        };
    } catch (error) {
        console.error(`Error fetching Student with id ${id}:`, error);
        throw error;
    }
};


