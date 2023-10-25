import React from 'react'
import { Session } from 'next-auth'
import { Center } from '@chakra-ui/react'

type Props = {
    session:Session | null,
    reloadSession: () => void
}

function Auth({session,reloadSession}: Props) {
  return (
    <Center>
        
    </Center>
  )
}

export default Auth