import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import '../styles/vars.css';
import '../styles/animation.css';
import '../styles/general.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        :root {
          font-family: ${GeistSans.style.fontFamily};
        }

        code,
        .monospace {
          font-family: ${GeistMono.style.fontFamily};
        }
      `}</style>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
