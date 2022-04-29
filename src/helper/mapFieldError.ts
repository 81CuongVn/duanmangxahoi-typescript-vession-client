import { FieldError } from "../generated/graphql"


export const mapFieldError = (error: FieldError[]):{
  [key:string]:string
} => {
  return error.reduce((accErrField, curr) => {
    return {
      ...accErrField,
      [curr.field]: curr.message,
    }
  }, {})
}
