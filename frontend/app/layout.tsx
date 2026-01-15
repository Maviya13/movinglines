import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { AuthModalProvider } from '@/hooks/use-auth-modal'
import { ErrorBoundary } from '@/components/providers/ErrorBoundary'
import { SponsorButton } from '@/components/SponsorButton'

export const metadata: Metadata = {
  title: 'MovingLines - Animation Engine',
  description: 'Transform complex mathematical concepts into beautiful animations using AI. Create stunning Manim visualizations with natural language.',
  keywords: ['manim', 'animation', 'math', 'visualization', 'AI', 'education', 'creative'],
  authors: [{ name: 'MovingLines' }],
  creator: 'MovingLines',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/logo.png',
  },
  openGraph: {
    title: 'MovingLines - Animation Engine',
    description: 'Transform complex mathematical concepts into beautiful animations using AI.',
    url: 'https://movinglines.co.in',
    siteName: 'MovingLines',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MovingLines - Animation Engine',
    description: 'Transform complex mathematical concepts into beautiful animations using AI.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} font-sans bg-background text-foreground antialiased`}>
        <ErrorBoundary>
          <AuthProvider>
            <AuthModalProvider>
              {children}
              <SponsorButton />
            </AuthModalProvider>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}

