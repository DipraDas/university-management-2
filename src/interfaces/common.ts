import { IGenericErrorMessage } from './error'

export type IGenericErrorResponst = {
  statusCode: number
  message: string
  errorMessages: IGenericErrorMessage[]
}
