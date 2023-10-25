import { Box, Button, Text } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import React from "react";

type Props = {};

const ConversationList = (props: Props) => {
  return (
    <Box
      width={{ base: "100%", md: "400px" }}
      position="relative"
      height="100%"
      overflow="hidden"
    >
      <Box
        py={2}
        px={4}
        mb={4}
        bg="blackAlpha.300"
        borderRadius={4}
        cursor="pointer"
        onClick={() => console.log("clicked")}
      >
        <Text textAlign="center" color="whiteAlpha.800" fontWeight={500}>
          Find or start a conversation
        </Text>
      </Box>
      <Box position="absolute" bottom={0} left={0} width="100%" px={8}>
        <Button width="100%" onClick={() => signOut()}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default ConversationList;
