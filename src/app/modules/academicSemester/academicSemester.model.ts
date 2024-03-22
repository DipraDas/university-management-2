import { Schema, model } from 'mongoose'
import {
    IAcademicSemester,
} from './academicSemester.interface'
import { academicSemesterCode, academicSemesterMonths, academicSemesterTitle } from './academicSemester.constants'
import ApiError from '../../../errors/ApiError'
import status from 'http-status';

const academicSemesterSchema = new Schema<IAcademicSemester>(
    {
        title: {
            type: String,
            required: true,
            enum: academicSemesterTitle,
        },
        year: {
            type: Number,
            required: true,
        },
        code: {
            type: String,
            required: true,
            enum: academicSemesterCode,
        },
        startMonth: {
            type: String,
            required: true,
            enum: academicSemesterMonths,
        },
        endMonth: {
            type: String,
            required: true,
            enum: academicSemesterMonths,
        },
    },
    {
        timestamps: true,
        versionKey: false
    },
)

academicSemesterSchema.pre('save', async function (next) {
    const isExist = await AcademicSemester.findOne({
        title: this.title,
        year: this.year
    });
    if (isExist) {
        throw new ApiError(status.CONFLICT, 'Academic semester is already exist');
    }
    next();
})

export const AcademicSemester = model<IAcademicSemester>(
    'AcademicSemester',
    academicSemesterSchema,
)