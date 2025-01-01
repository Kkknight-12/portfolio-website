'use client';

import React from 'react';
import Head from 'next/head';
import { usePathname } from 'next/navigation';
import { siteMetadata } from '@/constants';

export const SEOHead = () => {
  const pathName = usePathname();
  const seo = {
    title: "Mayank's portfolio",
    description: siteMetadata.description,
    siteName: siteMetadata.title,
    image: '',
    url: 'https://mayank-portfolio-seven.vercel.app',
  };
  return (
    <Head>
      <title>{seo.title}</title>
      <meta name='description' content={seo.description} />
      {/* <meta name="image" content={image} /> */}
      <link rel='canonical' key={seo.url} href={seo.url} />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={seo.title} />
      <meta name='twitter:url' content={`${seo.url}${pathName}`} />
      <meta name='twitter:description' content={seo.description} />
      {/* <meta name="twitter:image" content={image} /> */}

      <meta property='og:title' content={seo.title} />
      <meta property='og:site_name' content={seo.siteName} />
      {/* <meta property="og:image" content={image} /> */}
      <meta property='og:description' content={seo.description} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={seo.url} />
    </Head>
  );
};

export default SEOHead;
