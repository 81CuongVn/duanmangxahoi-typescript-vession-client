import { Box, Button, Heading, Flex, Spinner , Link} from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import InputField from '../components/InputField'
import Wrapper from '../components/Wrapper'
import {
  useForgotPasswordMutation,
  ForgotPasswordInput,
} from '../generated/graphql'
import { useCheckAuth } from '../util/useCheckAuth'
import NextLink from "next/link"
import Layout from './../components/Layout';

const ForgotPassword = () => {
  const [forgotPassword, { loading, data }] = useForgotPasswordMutation()
  const { data: authData, loading: authLoading } = useCheckAuth()
  const OnSubmitForm = async (
    value: ForgotPasswordInput,
    formikHelpers: FormikHelpers<ForgotPasswordInput>
  ) => {
    await forgotPassword({
      variables: {
        forgotPasswordInput: value,
      },
    })
  }
  const initialValues: ForgotPasswordInput = {
    email: '',
  }
  if (authLoading || (!authLoading && authData?.me)) {
    return (
      <Flex justifyContent='center' alignItems='center' minH='100vh'>
        <Spinner />
      </Flex>
    )
  } else {
    return (
      <>
        <Layout>
          <Formik initialValues={initialValues} onSubmit={OnSubmitForm}>
            {({ isSubmitting }) =>
              !loading && data ? (
                <Box> please check you email</Box>
              ) : (
                <>
                  <Box textAlign='center'>
                    <Heading>Forgot Password</Heading>
                  </Box>
                  <Form>
                    <InputField
                      label='type your email'
                      name='email'
                      placeholder='example : fpi open the door'
                      type='email'
                      required={true}
                      />
                      
                      <Flex mt={4}>
                        <NextLink href = "/login">
                          <Link>
                            Back To login
                          </Link>
                        </NextLink>
                      </Flex>

                    <Button
                      mx='auto'
                      type='submit'
                      colorScheme='teal'
                      variant='outline'
                      mt={4}
                      isLoading={isSubmitting}
                      w='100%'
                    >
                      Submit(vì không biết viết gì thêm =)))
                    </Button>
                  </Form>
                </>
              )
            }
          </Formik>
        </Layout>
      </>
    )
  }
}

export default ForgotPassword
