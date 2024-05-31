import Head from 'next/head';
import { useTagline } from '../hooks/useTagline';
import { Header } from '../components/header';
import { Nav } from '../components/nav/nav';
import { Footer } from '../components/footer';
import styles from './index.module.css';
import { Favicon } from '../components/favicon';

export default function Home({ tagline }) {
  return (
    <>
      <div className={`root ${styles.index} frame spaced-stack`}>
        <Head>
          <title>Matt Gross</title>
          <meta name="description" content={`Matt Gross - ${tagline}`} />
          <Favicon />
        </Head>

        <Header tagline={tagline} />

        <main>
          <Nav />
        </main>
      </div>

      {/* Absolute / out of flow */}
      <Footer />
    </>
  );
}

// Load tagline SSR to randomly show one each pageload
export async function getServerSideProps() {
  const tagline = useTagline();

  return { props: { tagline } };
}
