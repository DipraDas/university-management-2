import { RequestHandler } from 'express-serve-static-core'
import { AcademicSemesterService } from './academicSemester.service'
import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'

const createSemester = catchAsync(async (req: Request, res: Response) => {
    const { ...academicSemesterData } = req.body
    const result = await AcademicSemesterService.createSemester(academicSemesterData)
    res.status(200).json({
        success: true,
        message: 'Semester created successfully!',
        data: result,
    })
})

export const AcademicSemesterController = {
    createSemester,
}

