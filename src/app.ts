import express, { Application } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/users/users.route'
const app: Application = express()

app.use(cors())

//parser

console.log(app.get('env'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/app/v1/users', UserRoutes)

export default app
