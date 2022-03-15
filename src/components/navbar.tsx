import React from 'react'
import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react'
import { DarkModeSwitch } from './DarkModeSwitch'
import NextLink from 'next/link'
import { useMeQuery } from './../generated/graphql'

const Navbar = () => {
  const { data, error, loading } = useMeQuery()
  let body
  if (loading) {
    body = null
  } else if (!data?.me) {
    // user is login
    body = (
      <>
        <NextLink href='/login'>
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href='/register'>
          <Link>resigner</Link>
        </NextLink>
      </>
    )
  }else {
      body = (
          <>
          <Button>logout</Button>
          </>
      )
  }
  return (
    <Box bg='tan' p={4}>
      <Flex maxW={2000} justifyContent='space-between' m='auto' align='center'>
        <NextLink href='/'>
          <Heading>tên gì nhỉ kệ đi</Heading>
        </NextLink>
        <Box>{body}</Box>
        <Box>
          <DarkModeSwitch />
        </Box>
      </Flex>
    </Box>
  )
}

export default Navbar
