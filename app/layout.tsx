import type { Metadata } from 'next'
import { Noto_Sans_Arabic, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { StoreProvider } from '@/lib/store-context'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const _notoArabic = Noto_Sans_Arabic({ subsets: ["arabic"], variable: "--font-noto-arabic" });
const _spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: 'Onlin Story System - متجر إلكتروني',
  description: 'تصفح واشتري منتجات عالية الجودة. أدر متجرك كمسؤول أو بائع.',
  generator: 'ledoo',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport = {
  themeColor: '#1a1a2e',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${_notoArabic.variable} ${_spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        <StoreProvider>
          {children}
          <Toaster />
        </StoreProvider>
        <Analytics />
      </body>
    </html>
  )
}
