import { RequestHandler } from 'express-serve-static-core'
import usersService from './users.service'
import { NextFunction, Request, Response } from 'express'
const createUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user } = req.body
    const result = await usersService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'user created successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
    // res.status(400).json({
    //   error: err,
    // })
  }
}

export const UserController = {
  createUser,
}
