
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/chakra/ChakraProvider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'iMessenger',
  description: 'This is a iMessage clone!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          {children}
        </body>
      </Providers> 
    </html>
  )
}
