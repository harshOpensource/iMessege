
import React from 'react'
import { Session } from 'next-auth'

type Props = {
    session: Session
}

function Chat({session}: Props) {
  return (
    <div>Chat</div>
  )
}

export default Chat