import { Role, MeQuery } from './../generated/graphql'

export const useCheckUserIsAdmin = (data?: MeQuery) => {
  return (
    data?.me?.role.includes(Role.SuperAdmin) ||
    data?.me?.role.includes(Role.Admin) ||
    data?.me?.role.includes(Role.ContentAdmin)
  )
}
