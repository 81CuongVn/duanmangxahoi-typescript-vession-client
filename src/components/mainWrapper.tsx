import { Box } from "@chakra-ui/react"
import { DarkModeSwitch } from "./DarkModeSwitch"
import Navbar from "./Navbar"

const MainWrapper = () => {
  return (
    <>
      {' '}
      <Navbar />
      <Box>
        <DarkModeSwitch />
      </Box>
    </>
  )
}
export default MainWrapper
