
import axios from "axios";

export enum UserSex {
    MALE = "MALE",
    FEMALE = "FEMALE",
}

export interface Teacher {
    id: string;
    username: string;
    surname: string;
    email?: string;
    phone: string;
    address: string;
    img?: string;
    bloodType: string;
    sex: UserSex;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchTeachers = async (): Promise<Teacher[]> => {
    try {
        const response = await axios.get<any>(`${API_URL}/lists/teachers`);
        return response.data.data;
        
    } catch (error) {
        console.error("Error fetching teachers:", error);
        throw error;
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