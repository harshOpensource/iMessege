import React, { useState } from "react";
import { Session } from "next-auth";
import {
  Button,
  Center,
  Image,
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";

type Props = {
  session: Session | null;
  reloadSession: () => void;
  status: any;
};

function Auth({ session, reloadSession, status }: Props) {
  const [username, setUsername] = useState<string>("");

  const onSubmit = async () => {};

  return (
    <Center height="100vh">
      <Stack align="center" spacing={8}>
        {session ? (
          <>
            <Image src="/imessage-logo.png" height={100} width={100} />
            <Text fontSize="3xl">Create your username</Text>
            <Input
              placeholder="Enter a Username"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
            />

            <Button width="100%" /* isLoading={``} */ onClick={onSubmit}>
              Create
            </Button>
          </>
        ) : (
          <>
            <Image height={100} src="/imessage-logo.png" />
            <Text fontSize="4xl">MessengerQL</Text>
            <Text width="70%" align="center">
              Sign in with Google to send unlimited free messages to your
              friends
            </Text>
            {status === "loading" ? (
              <>
                <Spinner margin={4} />
              </>
            ) : (
              <Button
                onClick={() => signIn("google")}
                leftIcon={<Image height="20px" src="/googlelogo.png" />}
              >
                Continue with Google
              </Button>
            )}
          </>
        )}
      </Stack>
    </Center>
  );
}

export default Auth;
