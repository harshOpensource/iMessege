import UserOperations from "@/graphql-client/operations/users";
import {
  CreateUsernameData,
  CreateUsernameVariables,
} from "@/graphql-client/types";
import { useMutation } from "@apollo/client";
import {
  Button,
  Center,
  Image,
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  session: Session | null;
  reloadSession: () => void;
  status: any;
};

function Auth({ session, reloadSession, status }: Props) {
  const [username, setUsername] = useState<string>("");

  const [createUsername, { data, loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(UserOperations.Mutation.createUsername);

  const onSubmit = async () => {
    if (!username) return;

    try {
      const { data } = await createUsername({
        variables: {
          username,
        },
      });

      if (!data?.createUsername) {
        throw new Error();
      }

      if (data.createUsername.error) {
        const {
          createUsername: { error },
        } = data;
        toast.error(error);
        return;
      }

      toast.success("Username created! 🚀");
      reloadSession();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

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

            <Button width="100%" isLoading={loading} onClick={onSubmit}>
              Create
            </Button>
          </>
        ) : (
          <>
            <Image height={100} src="/imessage-logo.png" />
            <Text fontSize="4xl">MessengerQL</Text>
            {status !== "loading" && (
              <>
                <Text width="70%" align="center">
                  Sign in with Google to send unlimited free messages to your
                  friends
                </Text>
              </>
            )}
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
