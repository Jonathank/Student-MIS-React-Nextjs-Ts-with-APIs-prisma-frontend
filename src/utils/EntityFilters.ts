import { Parent, Student, Teacher } from "@/service/interfaces";
import { UserSex } from "@/service/interfaces";

export type ParentFilters = {
    page?: number;
    limit?: number;
    search?: string;
    gender?: string;
};

export type StudentFilters = {
    page?: number;
    limit?: number;
    search?: string;
    gender?: string;
    classId?: number;
    teacherId?: string;
};

export type TeacherFilters = {
    page?: number;
    limit?: number;
    search?: string;
    gender?: string;
    classId?: number;
}

// Master map (auto-typed)
export const entityMap = {
    parents: { model: {} as Parent, filters: {} as ParentFilters },
    students: { model: {} as Student, filters: {} as StudentFilters },
    teachers: {model: {} as Teacher, filters:{} as TeacherFilters},
} as const;