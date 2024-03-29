import { RequestHandler } from 'express-serve-static-core'
import { UserService } from './user.service'
import catchAsync from '../../../shared/catchAsync'
import { NextFunction, Request, Response } from 'express'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'

const createUser: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req.body
  const result = await UserService.createUser(user);
  next();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result
  })


})

export const UserController = {
  createUser,
}
