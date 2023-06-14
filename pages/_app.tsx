import '../styles/globals.css'

import { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import Header from '../components/layout/Header';
import Head from 'next/head';

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="max-w-lg mx-auto pb-4 bg-slate-100 min-h-screen">
      <Head>
        <meta property="og:title" content="Moodify - Personalized Spotify playlist based on you mood" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://moodify-songs.vercel.app/images/og_image.jpeg" />
        <meta property="og:url" content="https://moodify-songs.vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />

        <meta property="og:description" content="Let your mood pick the music on Spotify" />
        <meta property="og:site_name" content="Moodify" />
        <meta name="twitter:image:alt" content="Let your mood pick the music on Spotify" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon.png" />
        
        <meta name="twitter:site" content="Moodify" />
        <meta name="twitter:title" content="Moodify - Personalized Spotify playlist based on you mood" />
        <meta name="twitter:description" content="Let your mood pick the music on Spotify" />
        <meta name="twitter:image" content="https://moodify-songs.vercel.app/images/og_image.jpeg" />
        <title>Moodify</title>
      </Head>
      <Header />
      <Component {...pageProps} />
      <Analytics />
    </div>
  );

}

export default App;
