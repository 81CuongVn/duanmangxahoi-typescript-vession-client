import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'
import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import {
  initializeApollo,
  useApollo,
  addApolloState,
} from '../lib/apolloClient'
import { GetStaticProps , } from 'next'
import { GetAppInfoDocument } from './../generated/graphql';

function MyApp({ Component, pageProps , router}: AppProps) {
  const apolloClient = useApollo(pageProps)
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp
export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: GetAppInfoDocument,
  })

  return addApolloState(apolloClient, {
    props: {},
  })
}