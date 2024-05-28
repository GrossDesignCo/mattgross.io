import Head from 'next/head';
import Link from 'next/link';
import styles from './index.module.css';

export default function Page() {
  return (
    <div className="margin-off">
      <Head>
        <title>Exp 01 - Matt Gross</title>
        <meta
          name="description"
          content="Exploration 01: lch() Color & Framing"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.root}>
        <div className={styles.frame}>
          <div className={styles.bg} />
        </div>

        <div className={`monospace ${styles.meta}`}>
          <div>
            <div>
              <strong>Exploration 01</strong>: lch() Color & Framing
            </div>

            <div>
              <Link href="/" className={styles.link}>
                Main
              </Link>
            </div>
          </div>

          <div>May 2024</div>
        </div>
      </div>
    </div>
  );
}
