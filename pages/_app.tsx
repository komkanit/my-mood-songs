import '../styles/globals.css'

import { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import Header from '../components/layout/Header';

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="max-w-lg mx-auto bg-slate-100 min-h-screen">
      <Header />
      <Component {...pageProps} />
      <Analytics />
    </div>
  );

}

export default App;
