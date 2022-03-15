import React from 'react'
import { Formik, Form, FormikHelpers } from 'formik'
import Wrapper from '../components/Wrapper'
import InputField from '../components/InputField'
import { Button } from '@chakra-ui/react'
import { LoginInput, MeDocument, useLoginMutation } from '../generated/graphql'
import { mapFieldError } from './../helper/mapFieldError'
import { useRouter } from 'next/dist/client/router'

const Login = () => {
  const router = useRouter()
  const [loginUser, { error, data }] = useLoginMutation()
  const OnSubmitForm = async (
    value: LoginInput,
    formikHelpers: FormikHelpers<LoginInput>
  ) => {
    const response = await loginUser({
      variables: {
        loginInput: value,
        },
        update(cache , {data}){
            console.log("data login" , data)
            // const meData = cache.readQuery({
            //     query: MeDocument
            // })
            // console.log("me data" , meData)
            if (data?.login.success){
                cache.writeQuery({
                    query: MeDocument,
                    data: {
                        me: data.login.user
                    }
                })
            }
        }
    })
    if (response?.data?.login.error) {
      formikHelpers.setErrors(mapFieldError(response.data?.login.error))
      //   console.log(response.data)
    } else if (response.data?.login.user) {
      // register success
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
    <Wrapper>
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
            <Button
              type='submit'
              colorScheme='teal'
              mt={4}
              isLoading={isSubmitting}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

export default Login
