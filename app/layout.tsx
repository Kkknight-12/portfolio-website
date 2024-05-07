import { SettingContext } from '@/_context/SettingContext'
import Navbar from '@/components/Navbar'
import MuiThemeProvider from '@/theme'
import type { Metadata } from 'next'
import { Arima, Borel, Inter } from 'next/font/google'
import './globals.css'
import CanvasComponent from '@/components/canvas/ParticleComponent'

const inter = Inter({ subsets: ['latin'] })
const arima = Arima({ subsets: ['latin'] })
const borel = Borel({
  weight: '400',
  style: 'normal',
  display: 'swap',
  preload: true,
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Mayank',
  description: 'Mayank Sarasiya Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <SettingContext>
        <MuiThemeProvider>
          <body className={`${arima.className} ${inter.className}`}>
            <Navbar />
            {children}
          </body>
        </MuiThemeProvider>
      </SettingContext>
    </html>
  )
}
