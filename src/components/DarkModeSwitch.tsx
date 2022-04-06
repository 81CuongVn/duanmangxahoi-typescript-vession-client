import { useColorMode, Switch, IconButton } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  return (
    <>
      {/* <Switch color='green' isChecked={isDark} onChange={toggleColorMode} /> */}
      <IconButton
        aria-label='Toggle dark mode'
        onClick={toggleColorMode}
        variant='ghost'
        color='gray.500'
        icon={isDark ? <SunIcon /> : <MoonIcon />}
      />
    </>
  )
}
