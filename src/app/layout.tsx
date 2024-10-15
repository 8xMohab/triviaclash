import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import { NavigationBar } from '@/components/navigation'
import { ThemeProvider } from '@/components/theme-provider'
import Container from '@/components/container'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'TriviClash',
  description: 'A challenge game',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Container>
            <NavigationBar />
          </Container>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
