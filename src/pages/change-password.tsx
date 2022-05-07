import {
  Box,
  Button,
  Heading,
  Link,
  Flex,
  useToast,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import * as React from 'react'
import InputField from '../components/InputField'
import Wrapper from '../components/Wrapper'
import {
  ChangePasswordInputType,
  MeDocument,
  MeQuery,
  useChangePasswordMutation,
} from '../generated/graphql'
import { useRouter } from 'next/router'
import { mapFieldError } from './../helper/mapFieldError'
import { useState } from 'react'
import NextLink from 'next/link'
import { useCheckAuth } from '../util/useCheckAuth'
import Layout from '../components/Layout'

export interface IChangePasswordProps {}

function ChangePassword(props: IChangePasswordProps) {
  const [ChangePassword, {}] = useChangePasswordMutation()
  const [error, setError] = useState('')
  const router = useRouter()
  const toast = useToast()
  const { data: authData, loading: authLoading } = useCheckAuth()

  const initialValues: ChangePasswordInputType = {
    NewPassword: '',
  }
  const OnSubmitForm = async (
    values: ChangePasswordInputType,
    formikHelpers: FormikHelpers<ChangePasswordInputType>
  ) => {
    if (
      router.query.token &&
      router.query.token.length > 0 &&
      router.query.userId &&
      router.query.userId.length > 0
    ) {
      const response = await ChangePassword({
        variables: {
          changePasswordInput: values,
          token: router.query.token as string,
          userId: router.query.userId as string,
        },
        update(cache, { data }) {
          // const meData = cache.readQuery({
          //     query: MeDocument
          // })
          // console.log("me data" , meData)
          if (data?.changePassword.success && data.changePassword.user) {
            cache.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                me: data.changePassword.user,
              },
            })
          }
        },
      })
      if (response.data?.changePassword.error) {
        const filedError = mapFieldError(response.data?.changePassword.error)
        if ('token' in filedError || 'userId' in filedError) {
          setError(filedError.token || filedError.userId)
        }
        formikHelpers.setErrors(filedError)
      } else if (response.data?.changePassword.user) {
        // register success
        toast({
          title: 'xin chào bạn chào mừng bạn đã quay trở lại',
          description: `${response.data?.changePassword.user.username}`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        router.push('/')
      }
    }
  }
  if (authLoading || (!authLoading && authData?.me)) {
    return (
      <Flex justifyContent='center' alignItems='center' minH='100vh'>
        <Spinner />
      </Flex>
    )
  } else if (
    !(
      router.query.token &&
      router.query.token.length > 0 &&
      router.query.userId &&
      router.query.userId.length > 0
    )
  ) {
    return (
      <Box mx='auto' textAlign='center' maxW='500px' my={8}>
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Your reset password request invalid</AlertTitle>
        </Alert>
        <Flex mt={4}>
          <NextLink href='/login'>
            <Link>Back To login</Link>
          </NextLink>
        </Flex>
      </Box>
    )
  } else {
    return (
      <Layout>
        {error && error.length > 0 && (
          <Flex
            maxW='500px'
            maxH='300px'
            h='100%'
            w='100%'
            my={4}
            mx='auto'
            justifyContent='center'
            color='red'
            textAlign='center'
          >
            <Box>
              {error}
              <Box mt={4}>
                <NextLink href='/forgot-password'>
                  <Link>Go to the forgot password page</Link>
                </NextLink>
              </Box>
            </Box>
          </Flex>
        )}
        <Wrapper>
          <Formik initialValues={initialValues} onSubmit={OnSubmitForm}>
            {({ isSubmitting }) => (
              <>
                <Box textAlign='center'>
                  <Heading>Change Password</Heading>
                </Box>
                <Form>
                  <InputField
                    label='type your new password'
                    name='NewPassword'
                    placeholder='example : abcd@1234'
                    type='password'
                    required={true}
                  />
                  <Flex mt={4}>
                    <NextLink href='/login'>
                      <Link>Back To login</Link>
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
            )}
          </Formik>
        </Wrapper>
      </Layout>
    )
  }
}
export default ChangePassword
