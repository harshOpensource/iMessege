import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import React from "react";

type Props = {
  session: Session;
};

const Feed = ({ session }: Props) => {
  return <div>Feed</div>;
};

export default Feed;
