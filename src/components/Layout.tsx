import * as React from 'react'
import Navbar from './navbar'
import Wrapper, { WrapperSize } from './Wrapper'

interface ILayoutProps {
  children: React.ReactNode,
  WrapperSize?: WrapperSize
}

const Layout: React.FC<ILayoutProps> = (props) => {
  console.log(props)
  return (
    <>
      <Navbar></Navbar>
      <Wrapper size={props.WrapperSize}>{props.children}</Wrapper>
    </>
  )
}

export default Layout
