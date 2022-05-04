import {
  Flex,
  Spinner,
  Stack,
  Box,
  Link,
  Heading,
  Text,
} from '@chakra-ui/react'
import { GetPostsDocument } from '../generated/graphql'
import { addApolloState, initializeApollo } from '../lib/apolloClient'
import { useGetPostsQuery } from './../generated/graphql'
import NextLink from 'next/link'
import Layout from './../components/Layout'
import PostEditDeleteButton from '../components/PostEditDeleteButton'
import { GetStaticProps } from 'next'

const Index = () => {
  const { data, loading } = useGetPostsQuery()

  return (
    <Layout WrapperSize='regular'>
      {loading ? (
        <Flex justifyContent='center' alignItems='center' minH='100vh'>
          <Spinner />
        </Flex>
      ) : (
        <>
          <Stack spacing={8} mt={4}>
            {data?.getPosts?.posts?.map((post) => (
              <Flex key={post._id} p={5} shadow='md' borderWidth='1px'>
                <Box flex={1}>
                  <NextLink href={`/post/${post._id}`}>
                    <Link>
                      <Heading fontSize='xl'>{post.title}</Heading>
                    </Link>
                    
                  </NextLink>
                  <Text> posted by {post.author.username}</Text>
                  <Flex align='center'>
                    <Text mt={4}>{post.contentSnippet}</Text>
                    <Box ml='auto'>
                      <PostEditDeleteButton></PostEditDeleteButton>
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            ))}
          </Stack>
        </>
      )}
    </Layout>
  )
}

export default Index
export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: GetPostsDocument,
  })

  return addApolloState(apolloClient, {
    props: {},
  })
}
