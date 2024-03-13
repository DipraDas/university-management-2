import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/users/users.route'
const app: Application = express()

app.use(cors())

//parser

console.log(app.get('env'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/app/v1/users', UserRoutes)

class ApiError extends Error {
  statusCode: number
  constructor(statusCode: number, message: string | undefined, stack = '') {
    super(message)
    this.statusCode = statusCode
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  //   throw new ApiError(400, 'O re baba')
  next('ore baba error')
})

app.use((err, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    res.status(400).json({ error: err })
  } else {
    res.status(500).json({ error: 'Something went wrong.' })
  }
  console.log(err)
})

export default app
