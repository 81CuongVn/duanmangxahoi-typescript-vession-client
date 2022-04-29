import React from 'react'
import { Formik, Form, FormikHelpers } from 'formik'
import Wrapper from '../components/Wrapper'
import InputField from '../components/InputField'
import { Button, Flex, Spinner, useToast , Box,Link} from '@chakra-ui/react'
import {
  ResisterInput,
  useRegisterMutation,
  MeDocument,
  MeQuery,
} from '../generated/graphql'
import { mapFieldError } from './../helper/mapFieldError'
import { useRouter } from 'next/dist/client/router'
import Navbar from '../components/navbar'
import { useCheckAuth } from '../util/useCheckAuth'
import NextLink from 'next/link'
import Layout from './../components/Layout';


const Register = () => {
  const router = useRouter()
  const toast = useToast()
  const [registerUser, { error, data }] = useRegisterMutation()

  const { data: authData, loading: authLoading } = useCheckAuth()
  const OnSubmitForm = async (
    value: ResisterInput,
    formikHelpers: FormikHelpers<ResisterInput>
  ) => {
    const response = await registerUser({
      variables: {
        registerInput: value,
      },
      update(cache, { data }) {
        // const meData = cache.readQuery({
        //     query: MeDocument
        // })
        // console.log("me data" , meData)
        if (data?.register.success && data.register.user) {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              me: data.register.user,
            },
          })
        }
      },
    })
    if (response?.data?.register.error) {
      formikHelpers.setErrors(mapFieldError(response.data?.register.error))
    } else if (response.data?.register.user) {
      // register success
      toast({
        title: 'xin chào bạn chào mừng bạn đã quay trở lại',
        description: `${response.data?.register.user.username}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      router.push('/')
    }
  }
  const initialValues: ResisterInput = {
    username: '',
    password: '',
    email: '',
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
          <Wrapper>
            <Formik initialValues={initialValues} onSubmit={OnSubmitForm}>
              {({ isSubmitting }) => (
                <Form>
                  <InputField
                    label='type your user'
                    name='username'
                    placeholder='example : fpi open the door'
                  />
                  <InputField
                    label='type your password'
                    name='password'
                    placeholder='type your password'
                    type='password'
                  />
                  <InputField
                    label='type your email'
                    name='email'
                    placeholder='type your email'
                    type='email'
                  />
                  <Box mt={2}>
                    <Flex>
                      <NextLink href='/forgot-password' passHref>
                        <Link ml='auto'>Forgot Password</Link>
                      </NextLink>
                    </Flex>
                    <Flex>
                      <NextLink href='/login' passHref>
                        <Link ml='auto'>Click here to login</Link>
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
                    Register
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

export default Register
