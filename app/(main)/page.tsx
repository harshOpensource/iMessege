"use client"

import { Box, Button } from '@chakra-ui/react'
import Image from 'next/image'
import { signIn } from 'next-auth/react'

export default function Home() {
  return (
    <main>
      <Box>
         <Button onClick={() => signIn()}>Sign In</Button>vfvf
      </Box>
    </main>
  )
}
