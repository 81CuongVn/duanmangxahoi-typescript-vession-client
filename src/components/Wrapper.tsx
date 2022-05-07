import { Box } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

export type WrapperSize = 'regular' | 'small'

export interface WrapperPropType {
  children: ReactNode
  size?: WrapperSize
}

const Wrapper = ({ children, size = 'small' }: WrapperPropType) => {
  const maxWidth = size === 'regular' ? '900px' : '400px'
  return (
    <>
      <Box maxW={maxWidth} w='100%' mt={8} mx='auto'>
        {children}
      </Box>
    </>
  )
}

export default Wrapper
