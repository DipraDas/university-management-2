import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/users/users.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
const app: Application = express()

app.use(cors())

//parser

console.log(app.get('env'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/app/v1/users', UserRoutes)

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   //   throw new ApiError(400, 'O re baba')
//   next('ore baba error')
// })

app.use(globalErrorHandler)

export default app
