import { ChakraProvider, Box } from '@chakra-ui/react'

import theme from '../theme'
import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'
import { DarkModeSwitch } from './../components/DarkModeSwitch'
import Navbar from '../components/navbar'

function MyApp({ Component, pageProps , router}: AppProps) {
  const apolloClient = useApollo(pageProps)
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
        {/* <Box mt="100%">
          <DarkModeSwitch />
        </Box> */}
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp
