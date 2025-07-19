import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { MemoryProvider } from './contexts/MemoryContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CorMemory - Your Digital Memory Sanctuary',
  description: 'A beautiful space for your real-world memories and experiences.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full antialiased`}>
        <MemoryProvider>
          {children}
        </MemoryProvider>
      </body>
    </html>
  )
} 