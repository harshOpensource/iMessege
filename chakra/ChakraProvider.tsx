'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { theme } from './theme'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
      <ChakraProvider resetCSS theme={theme}>
        {children}
      </ChakraProvider>
  )
}

export default Providers