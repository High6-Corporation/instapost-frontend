import type { Metadata } from 'next'
import './globals.css'
import { ConsentProvider } from '@/components/consent/ConsentProvider'
import { CookieConsentBanner } from '@/components/consent/CookieConsentBanner'
import { CookieSettingsModal } from '@/components/consent/CookieSettingsModal'
import { ConsentScriptLoader } from '@/components/consent/ConsentScriptLoader'
import { QuoteModalProvider } from '@/components/sections/quote/QuoteModalProvider'
import QuoteModalRenderer from '@/components/sections/quote/QuoteModalRenderer'

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://instapost.co',
  ),
  title: {
    template: '%s | Instapost',
    default: 'Instapost - Your Content Platform',
  },
  description: 'Instapost - Modern content and commerce platform',
  icons: {
    icon: [
      { url: '/icons/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/icons/favicon-512x512.png',
  },
  openGraph: {
    title: 'Instapost - Your Content Platform',
    description: 'Instapost - Modern content and commerce platform',
    url: 'https://instapost.co',
    siteName: 'Instapost',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Instapost - Your Content Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Instapost - Your Content Platform',
    description: 'Instapost - Modern content and commerce platform',
    images: ['/images/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <ConsentProvider>
          <QuoteModalProvider>
            {children}
            <QuoteModalRenderer />
          </QuoteModalProvider>
          <CookieConsentBanner />
          <CookieSettingsModal />
          <ConsentScriptLoader />
        </ConsentProvider>
      </body>
    </html>
  )
}
