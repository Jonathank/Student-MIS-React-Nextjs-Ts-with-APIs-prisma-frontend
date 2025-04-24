import { Parent, Student, Subject, Teacher } from "@/service/interfaces";
export type SubjectFilters = {
    page?: number;
    limit?: number;
    search?: string;
}
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
    subjects:{model: {} as Subject, filters: {} as SubjectFilters},
    parents: { model: {} as Parent, filters: {} as ParentFilters },
    students: { model: {} as Student, filters: {} as StudentFilters },
    teachers: {model: {} as Teacher, filters:{} as TeacherFilters},
} as const;