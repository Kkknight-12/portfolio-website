import { SettingContext } from '@/_context/SettingContext';
import Navbar from '@/components/Navbar';
import MuiThemeProvider from '@/theme';
import type { Metadata } from 'next';
import { Arima, Inter } from 'next/font/google';
import './globals.css';
import { siteMetadata } from '@/constants';

const inter = Inter({ subsets: ['latin'] });
const arima = Arima({ subsets: ['latin'] });

export const metadata: Metadata = {
  applicationName: 'Mayank Portfolio',
  title: siteMetadata.title,
  description: siteMetadata.description,
  openGraph: {
    type: 'website',
    url: siteMetadata.url,
    title: siteMetadata.title,
    description: siteMetadata.description,
    siteName: siteMetadata.siteName,
    images: [
      {
        url: 'https://mayank-portfolio-seven.vercel.app/og.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MayankTwitterHandle',
    creator: '@MayankTwitterHandle',
    images: 'https://mayank-portfolio-seven.vercel.app/twitter-card.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <SettingContext>
        <MuiThemeProvider>
          <body className={`${arima.className} ${inter.className}`}>
            {/* bg blur effect */}
            <div className='bg-[#fbe2e3] dark:bg-[#946283] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[12rem] sm:w-[68.75rem]' />
            {/*  */}
            <div className='bg-[#dbd7fb] dark:bg-[#595580] absolute top-[-1rem] -z-10 left-[-35rem] h-[50rem] w-[31.25rem] rounded-full blur-[12rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]' />
            <Navbar />
            {children}
          </body>
        </MuiThemeProvider>
      </SettingContext>
    </html>
  );
}
