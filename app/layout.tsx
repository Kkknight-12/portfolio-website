import Navbar from '@/components/Navbar';
import type { Metadata } from 'next';
import { Arima, Inter } from 'next/font/google';
import './globals.css';
import { siteMetadata } from '@/constants';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { LayoutWrapper } from './layoutWrapper';
import LoadingBar from '@/components/LoadingBar';

const inter = Inter({ subsets: ['latin'] });
const arima = Arima({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.url || 'https://mayank-portfolio-seven.vercel.app'),
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
  keywords: [
    'reactjs',
    'nextjs',
    'vercel',
    'react',
    'portfolio',
    'portfolio-next',
    'emailjs',
    'framer-motion',
    'react-hot-toast',
    'react-icons',
    'react-intersection-observer',
    'react-vertical-timeline',
    'tailwindcss',
    'ui/ux',
    'js',
    'javascript',
    'typescript',
    'html',
    'css',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${arima.className} ${inter.className}`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem={false}
          disableTransitionOnChange
        >
          <LoadingBar />
          <Navbar />
          <LayoutWrapper>
            {/* bg blur effect */}
            <div className='bg-[#fbe2e3] dark:bg-[#946283] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[12rem] sm:w-[68.75rem]' />
            {/*  */}
            <div className='bg-[#dbd7fb] dark:bg-[#595580] absolute top-[-1rem] -z-10 left-[-35rem] h-[50rem] w-[31.25rem] rounded-full blur-[12rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]' />
            {children}
          </LayoutWrapper>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
