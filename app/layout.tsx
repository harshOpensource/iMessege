
import Providers from '@/chakra/ChakraProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AuthProvider from './_context/AuthProvider'
import './globals.css'
import { Toaster } from 'react-hot-toast';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'iMessenger',
  description: 'This is a iMessage clone!',
  icons: {
    icon: [
      {
        url: "/imessage-logo.png",
        href: "/imessage-logo.png",
      }
    ]
  }
}




export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Providers>
            <Toaster />
            {children}
          </Providers>
        </AuthProvider>
      </body> 
    </html>
  )
}

