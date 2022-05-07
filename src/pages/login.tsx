import React from 'react'
import { Formik, Form, FormikHelpers } from 'formik'
import Wrapper from '../components/Wrapper'
import InputField from '../components/InputField'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Flex,
  Heading,
  Spinner,
  Link,
} from '@chakra-ui/react'
import { LoginInput, MeDocument, useLoginMutation } from '../generated/graphql'
import { mapFieldError } from './../helper/mapFieldError'
import { useRouter } from 'next/dist/client/router'
import Navbar from '../components/navbar'
import { useCheckAuth } from './../util/useCheckAuth'
import { useToast } from '@chakra-ui/react'
import NextLink from 'next/link'
import Layout from './../components/Layout';

const Login = () => {
  const router = useRouter()
  const [loginUser, { error, data }] = useLoginMutation()
  const [errorMessage, SetErrorMessage] = React.useState<{
    Title: string
    Message: string
  } | null>(null)
  const toast = useToast()
  const { data: authData, loading: authLoading } = useCheckAuth()
  const OnSubmitForm = async (
    value: LoginInput,
    formikHelpers: FormikHelpers<LoginInput>
  ) => {
    const response = await loginUser({
      variables: {
        loginInput: value,
      },
      update(cache, { data }) {
        // const meData = cache.readQuery({
        //     query: MeDocument
        // })
        // console.log("me data" , meData)
        if (data?.login.success) {
          cache.writeQuery({
            query: MeDocument,
            data: {
              me: data.login.user,
            },
          })
        }
      },
    })
    if (response?.data?.login.error) {
      formikHelpers.setErrors(mapFieldError(response.data?.login.error))
      console.log(response.data?.login.error)
      SetErrorMessage({
        Title: 'Login failed',
        Message: response.data?.login.error[0].message,
      })
      //   console.log(response.data)
    } else if (response.data?.login.user) {
      // register success
      toast({
        title: 'xin chào bạn chào mừng bạn đã quay trở lại',
        description: `${response.data?.login.user.username}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      router.push('/')
    }
  }
  const initialValues: LoginInput = {
    UsernameOrEmail: '',
    password: '',
  }
  if (error) {
    console.log(error)
  }

  return (
    <Layout>
      {authLoading || (!authLoading && authData?.me) ? (
        <Flex justifyContent='center' alignItems='center' minH='100vh'>
          <Spinner />
        </Flex>
      ) : (
        <>
          {errorMessage && (
            <Box maxW='500px' w='100%' mt={8} mx='auto'>
              <Alert status='error'>
                <AlertIcon />
                <AlertTitle mr={2}>{errorMessage.Title}</AlertTitle>
                <AlertDescription>{errorMessage.Message}</AlertDescription>
                <CloseButton
                  position='absolute'
                  right='8px'
                  top='8px'
                  onClick={() => {
                    SetErrorMessage(null)
                  }}
                />
              </Alert>
            </Box>
          )}

          <Wrapper>
            <Box textAlign='center'>
              <Heading>Login</Heading>
            </Box>
            <Formik initialValues={initialValues} onSubmit={OnSubmitForm}>
              {({ isSubmitting }) => (
                <Form>
                  <InputField
                    label='type your user'
                    name='UsernameOrEmail'
                    placeholder='example : fpi open the door'
                  />
                  <InputField
                    label='type your password'
                    name='password'
                    placeholder='type your password'
                    type='password'
                  />
                  <Box mt={2}>
                    <Flex>
                      <NextLink href='/forgot-password' passHref>
                        <Link ml='auto'>Forgot Password</Link>
                      </NextLink>
                    </Flex>
                    <Flex>
                      <NextLink href='/register' passHref>
                        <Link ml='auto'>Click here to create account</Link>
                      </NextLink>
                    </Flex>
                  </Box>
                  <Button
                    mx='auto'
                    type='submit'
                    colorScheme='teal'
                    variant='outline'
                    mt={4}
                    isLoading={isSubmitting}
                    w='100%'
                  >
                    Login
                  </Button>
                </Form>
              )}
            </Formik>
          </Wrapper>
        </>
      )}
    </Layout>
  )
}

export default Login
