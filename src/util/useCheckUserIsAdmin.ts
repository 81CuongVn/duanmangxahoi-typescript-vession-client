import { Role, useMeQuery } from './../generated/graphql'

export const useCheckUserIsAdmin = () => {
  const { data, loading } = useMeQuery()
  if (!loading) {
    return (
      data?.me?.role.includes(Role.SuperAdmin) ||
      data?.me?.role.includes(Role.Admin) ||
      data?.me?.role.includes(Role.ContentAdmin)
    )
    }
    return false
}
