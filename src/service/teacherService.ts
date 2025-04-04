
import axios from "axios";

export interface Admin {
    id: string;
    username: string;
}

export enum UserSex {
    MALE = "MALE",
    FEMALE = "FEMALE",
}

export interface Student {
    id: string;
    username: string;
    surname: string;
    email?: string;
    phone?: string;
    address: string;
    img?: string;
    bloodType: string;
    sex: UserSex;
    createdAt: Date;
    updatedAt: Date;
    parentId: string;
    parent: Parent;
    classId: number;
    class: Class;
    gradeId: number;
    grade: Grade;
    attendance: Attendance[];
    result: Result[];
}

export interface Teacher {
    id: string;
    username: string;
    surname: string;
    email?: string;
    phone?: string;
    address: string;
    img?: string;
    bloodType: string;
    sex: UserSex;
    createdAt: Date;
    updatedAt: Date;
    subjects: Subject[];
    lessons: Lesson[];
    classes: Class[];
}

export interface Subject {
    id: number;
    name: string;
    teachers: Teacher[];
    lessons: Lesson[];
}

export interface Lesson {
    id: number;
    name: string;
    day: Day;
    startTime: Date;
    endTime: Date;
    subjectId: number;
    subject: Subject;
    classId: number;
    class: Class;
    teacherId: string;
    teacher: Teacher;
    exams: Exam[];
    assignments: Assignment[];
    attendance: Attendance[];
}

export interface Class {
    id: number;
    name: string;
    capacity: number;
    supervisorId?: string;
    supervisor?: Teacher;
    lessons: Lesson[];
    students: Student[];
    gradeId: number;
    grade: Grade;
    events: Event[];
    announcements: Announcement[];
}

export interface Grade {
    id: number;
    level: number;
    students: Student[];
    classes: Class[];
}

export enum Day {
    MONDAY = "MONDAY",
    TUESDAY = "TUESDAY",
    WEDNESDAY = "WEDNESDAY",
    THURSDAY = "THURSDAY",
    FRIDAY = "FRIDAY",
}

export interface Parent {
    id: string;
    username: string;
    surname: string;
    email?: string;
    phone: string;
    address: string;
    img?: string;
    bloodType: string;
    sex: UserSex;
    createdAt: Date;
    updatedAt: Date;
    students: Student[];
}

export interface Exam {
    id: number;
    title: string;
    startTime: Date;
    endTime: Date;
    lessonId: number;
    lesson: Lesson;
    results: Result[];
}

export interface Assignment {
    id: number;
    title: string;
    startDate: Date;
    dueDate: Date;
    lessonId: number;
    lesson: Lesson;
    results: Result[];
}

export interface Result {
    id: number;
    score: number;
    exam?: Exam;
    examId?: number;
    assignment?: Assignment;
    assignmentId?: number;
    studentId: string;
    student: Student;
}

export interface Attendance {
    id: number;
    date: Date;
    present: boolean;
    studentId: string;
    student: Student;
    lessonId: number;
    lesson: Lesson;
}

export interface Event {
    id: number;
    title: string;
    description: string;
    startTime: Date;
    endTime: Date;
    classId?: number;
    class?: Class;
}

export interface Announcement {
    id: number;
    title: string;
    description: string;
    date: Date;
    classId?: number;
    class?: Class;
}




const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchTeachers = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get<any>(`${API_URL}/lists/teachers`, {
            params: { page, limit }
        });
        return {
            data: response.data.data.data, // Notice the additional .data
            totalPages: response.data.data.totalPages,
        };
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