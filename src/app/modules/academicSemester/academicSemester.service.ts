import { IAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model"

const createSemester = async (payload: IAcademicSemester): Promise<IAcademicSemester> => {
    console.log('payload', payload);
    const result = await AcademicSemester.create(payload);
    return result;
}

export const AcademicSemesterService = {
    createSemester
}