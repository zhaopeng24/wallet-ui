import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import WagmiProvider from '@/components/WagmiProvider'
import './globals.css'
import { Providers } from './providers'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Smarter-Wallet',
  description: 'Get your Smarter-Wallet',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
<<<<<<< Updated upstream
    <html lang='en'>
      <body className={inter.className}>
        <WagmiProvider>{children}</WagmiProvider>
=======
    <html lang='en' className='dark'>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
>>>>>>> Stashed changes
      </body>
    </html>
  )
}
