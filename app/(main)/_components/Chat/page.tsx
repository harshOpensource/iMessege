import React from "react";
import { Session } from "next-auth";
import { Flex } from "@chakra-ui/react";
import ConversationWrapper from "./Conversations/ConversationWrapper";
import Feed from "./Feed/Feed";

type Props = {
  session: Session;
};

function Chat({ session }: Props) {
  return (
    <Flex height="100vh">
      <ConversationWrapper session={session} />
      <Feed session={session} />
    </Flex>
  );
}

export default Chat;
