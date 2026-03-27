import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Snowfall } from '@/components/snowfall'
import './globals.css'

export const metadata: Metadata = {
  title: 'IceCold - Asesor de Corte de Pelo con IA',
  description: 'Descubre tu corte de pelo ideal con reconocimiento facial inteligente. Analiza la forma de tu rostro y recibe recomendaciones personalizadas.',
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

export const viewport: Viewport = {
  themeColor: '#0b1f3a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        <Snowfall />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
