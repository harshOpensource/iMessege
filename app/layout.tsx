import Providers from "@/chakra/ChakraProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./_context/AuthProvider";
import "./globals.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ApolloWrapper } from "@/graphql-client/ApolloProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iMessenger",
  description: "This is a iMessage clone!",
  icons: {
    icon: [
      {
        url: "/imessage-logo.png",
        href: "/imessage-logo.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = new ApolloClient({
    uri: "http://localhost:3000/api/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
      <body className={inter.className}>
        <ApolloWrapper>
          <AuthProvider>
            <Providers>
              <Toaster />
              {children}
            </Providers>
          </AuthProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
