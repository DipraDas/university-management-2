import { RequestHandler } from 'express-serve-static-core'
import { AcademicSemesterService } from './academicSemester.service'

const createSemester: RequestHandler = async (req, res, next) => {
    try {
        console.log('helllo');
        const { ...academicSemesterData } = req.body
        console.log('+++++', academicSemesterData)
        const result = await AcademicSemesterService.createSemester(academicSemesterData)
        console.log('res-----', result);
        res.status(200).json({
            success: true,
            message: 'Semester created successfully!',
            data: result,
        })
    } catch (err) {
        next(err)
    }
}

export const AcademicSemesterController = {
    createSemester,
}

