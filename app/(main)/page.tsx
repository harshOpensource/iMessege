"use client";

import { Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Auth from "./_components/Auth/page";
import Chat from "./_components/Chat/page";

import "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;
  }

  interface User {
    id: string;
    username: string;
  }
}

export default function Home() {
  const { data: session, status } = useSession();

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  return (
    <main>
      <Box>
        {session && session.user?.username ? (
          <Chat session={session} />
        ) : (
          <Auth
            session={session}
            reloadSession={reloadSession}
            status={status}
          />
        )}
      </Box>
    </main>
  );
}
