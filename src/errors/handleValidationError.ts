// import mongoose from 'mongoose'
// import { IGenericErrorMessage } from '../interfaces/error'
// import { IGenericErrorResponst } from '../interfaces/common'

// const handleValidationError = (
//   err: mongoose.Error.ValidationError,
// ): IGenericErrorResponst => {
//   const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
//     (el: mongoose.Error.ValidationError | mongoose.Error.CastError) => {
//       return {
//         path: el?.path,
//         message: el?.message,
//       }
//     },
//   )
//   const statusCode = 400
//   return {
//     statusCode,
//     message: 'Validation Error',
//     errorMessages: errors,
//   }
// }

// export default handleValidationError

// import mongoose from 'mongoose'
// import { IGenericErrorMessage } from '../interfaces/error'
// import { IGenericErrorResponst } from '../interfaces/common'

// const handleValidationError = (
//   err: mongoose.Error.ValidationError,
// ): IGenericErrorResponst => {
//   const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
//     (el: Error) => {
//       return {
//         path: el?.path,
//         message: el?.message,
//       }
//     },
//   )
//   const statusCode = 400
//   return {
//     statusCode,
//     message: 'Validation Error',
//     errorMessages: errors,
//   }
// }

// export default handleValidationError

import mongoose, { Error as MongooseError } from 'mongoose'
import { IGenericErrorMessage } from '../interfaces/error'
import { IGenericErrorResponst } from '../interfaces/common'

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): IGenericErrorResponst => {
  const errors: IGenericErrorMessage[] = []

  for (const key in err.errors) {
    if (err.errors.hasOwnProperty(key)) {
      const el: MongooseError.ValidatorError | MongooseError.CastError =
        err.errors[key]
      if ('properties' in el) {
        // Check if the error is a ValidatorError
        errors.push({
          path: el.path ?? 'Unknown Path', // Providing a default value in case path is missing
          message: el.message ?? 'Unknown Message', // Providing a default value in case message is missing
        })
      }
    }
  }

  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}

export default handleValidationError
