import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMeQuery } from './../generated/graphql'

export const useCheckAuth = () => {
  const router = useRouter()
  const { data, loading } = useMeQuery()
  useEffect(() => {
    const isInLoginOrRegisterPage =
      router.route === '/login' ||
      router.route == '/register' ||
      router.route == '/forgot-password' ||
      router.route == '/change-password'
    if (!loading && data?.me && isInLoginOrRegisterPage) {
      router.replace('/')
    }
  }, [data, loading, router])
  return {
    data,
    loading,
  }
}
