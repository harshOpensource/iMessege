import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import React from "react";
import ConversationList from "./ConversationList";

type Props = {
  session: Session;
};

function ConversationWrapper({ session }: Props) {
  return (
    <Box width={{ md: "430px" }} bg="whiteAlpha.50" gap={4} py={6} px={3}>
      <ConversationList />
    </Box>
  );
}

export default ConversationWrapper;
