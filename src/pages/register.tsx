import React from 'react'
import { Formik, Form , FormikHelpers} from 'formik'
import Wrapper from '../components/Wrapper'
import InputField from '../components/InputField'
import { Button } from '@chakra-ui/react'
import { ResisterInput, useRegisterMutation } from '../generated/graphql'
import { mapFieldError } from './../helper/mapFieldError';
import { useRouter } from 'next/dist/client/router'

const Register = () => {
  const router = useRouter()
  const [registerUser, { error, data }] = useRegisterMutation()
  const OnSubmitForm = async (value: ResisterInput, formikHelpers: FormikHelpers<ResisterInput>) => {
    const response =  await registerUser({
      variables: {
        registerInput: value,
      },
    })
    if (response?.data?.register.error) {
      formikHelpers.setErrors(mapFieldError(response.data?.register.error))
    } else if (response.data?.register.user) {
      // register success
      router.push("/")
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
            <Button
              type='submit'
              colorScheme='teal'
              mt={4}
              isLoading={isSubmitting}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

export default Register
