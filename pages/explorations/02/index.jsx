import Head from 'next/head';
import Link from 'next/link';
import styles from './index.module.css';
import { Favicon } from '../../../components/favicon';

export default function Page() {
  return (
    <div>
      <Head>
        <title>Exploration 02 - Matt Gross</title>
        <meta
          name="description"
          content="Exploration 01: lch() Color & Framing"
        />
        <Favicon />
      </Head>

      <div className={styles.root}>
        <div className={styles.frame}>
          <div className={styles.bg12} />
          <div className={styles.bg11} />
          <div className={styles.bg10} />
          <div className={styles.bg9} />
          <div className={styles.bg8} />
          <div className={styles.bg7} />
          <div className={styles.bg6} />
          <div className={styles.bg5} />
          <div className={styles.bg4} />
          <div className={styles.bg3} />
          <div className={styles.bg2} />
          <div className={styles.bg1} />
        </div>

        <div className={`monospace ${styles.meta}`}>
          <div className="stack">
            <div>
              <strong>Exploration 02</strong>: Conic Gradients
            </div>

            <div>
              <Link href="/" className={styles.link}>
                Main
              </Link>{' '}
              /{' '}
              <Link href="/explorations/01" className={styles.link}>
                01
              </Link>
            </div>
          </div>

          <div className="stack align-end">
            <div>May 2024</div>
            <div>
              Based on{' '}
              <Link
                href="https://x.com/FonsMans/status/1795025314810409342"
                className={styles.link}
              >
                Endless
              </Link>{' '}
              by <Link href="https://x.com/FonsMans">Fons Mans</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
