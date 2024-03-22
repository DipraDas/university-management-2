import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/user/user.route'
import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemester.route'
const app: Application = express()

app.use(cors())

//parser

console.log(app.get('env'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/app/v1/users', UserRoutes)
app.use('/app/v1/academic-semesters', AcademicSemesterRoutes)

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  //   Promise.reject(new Error('Unhanled Promise Rejection'))
  //   throw new ApiError(400, 'O re baba')
  //   next('ore baba error')
  throw new Error('Testing Errror')
})

app.use(globalErrorHandler)

export default app
