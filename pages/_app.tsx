import '../styles/globals.css'

import { AppProps } from 'next/app';
import Header from '../components/layout/Header';

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="max-w-lg mx-auto">
      <Header />
      <Component {...pageProps} />
    </div>
  );

}

export default App;
