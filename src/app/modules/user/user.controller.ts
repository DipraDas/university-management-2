import { RequestHandler } from 'express-serve-static-core'
import { UserService } from './user.service'
import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'

const createUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {

  const { user } = req.body
  const result = await UserService.createUser(user)
  res.status(200).json({
    success: true,
    message: 'User created successfully!',
    data: result,
  })

})

export const UserController = {
  createUser,
}
