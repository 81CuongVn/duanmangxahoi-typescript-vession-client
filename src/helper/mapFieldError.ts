import { FieldError } from "../generated/graphql"


export const mapFieldError = (error: FieldError[]) => {
  return error.reduce((accErrField, curr) => {
    return {
      ...accErrField,
      [curr.field]: curr.message,
    }
  }, {})
}
