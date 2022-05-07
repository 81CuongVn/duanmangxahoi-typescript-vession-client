import React from 'react'
import { Box, Button, Flex, Heading, Link, Spinner } from '@chakra-ui/react'
import NextLink from 'next/link'
import {
  MeDocument,
  MeQuery,
  useGetAppInfoQuery,
  useLogoutMutation,
  useMeQuery,
} from '../generated/graphql'
import { useRouter } from 'next/router'

const Navbar = () => {
  const { data, loading: useMeQueryLoading } = useMeQuery()
  const router = useRouter()
  const [logoutUser, { loading: useLogoutMutationLoading }] =
    useLogoutMutation()
  const isInLoginOrRegisterPage =
    router.route === '/login' || router.route == '/register'
  const { data: AppInfo, loading: GetAppInfoLoading } = useGetAppInfoQuery()
  let body
  if (useMeQueryLoading || GetAppInfoLoading) {
    // body = null
    return (
      <Flex justifyContent='center' alignItems='center' minH='100vh'>
        <Spinner />
      </Flex>
    )
  } else if (!data?.me) {
    // user is login
    if (!isInLoginOrRegisterPage)
      body = (
        <>
          <NextLink href='/login'>
            <Link mr={2}>login</Link>
          </NextLink>
          {'/'}
          <NextLink href='/register'>
            <Link>resigner</Link>
          </NextLink>
        </>
      )
  } else if (!isInLoginOrRegisterPage) {
    const LogoutUser = async () => {
      await logoutUser({
        update(cache, { data }) {
          if (data) {
            cache.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                me: null,
              },
            })
          }
        },
      })
    }
    body = (
      <>
        <Button onClick={LogoutUser} isLoading={useLogoutMutationLoading}>
          logout
        </Button>
      </>
    )
  }
  return (
    <Box bg='tan' p={4}>
      <Flex
        maxW='100%'
        align='center'
        textAlign='center'
        justifyContent='space-between'
      >
        <Box>
          <NextLink href='/'>
            <Heading>{AppInfo?.getAppInfo?.name}</Heading>
          </NextLink>
        </Box>
        <Box>
          <NextLink href='/'>Home</NextLink>
        </Box>
        {data?.me && (
          <Box>
            <NextLink href='/profile'>Your Profile</NextLink>
          </Box>
        )}
        <Box>
          <NextLink href='/alert'>Thông báo</NextLink>
        </Box>
        <Box>{body}</Box>
      </Flex>
    </Box>
  )
}

export default Navbar
