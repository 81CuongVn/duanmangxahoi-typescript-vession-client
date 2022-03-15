import { FieldError } from './../../../server/src/types/errorField'

export const mapFieldError = (error: FieldError[]) => {
  return error.reduce((accErrField, curr) => {
    return {
      ...accErrField,
      [curr.field]: curr.message,
    }
  }, {})
}
