import Head from 'next/head';
import { Link } from '../../../components/link';
import styles from './index.module.css';
import { Favicon } from '../../../components/favicon';

export default function Page() {
  return (
    <div>
      <Head>
        <title>Exploration 01 - Matt Gross</title>
        <meta
          name="description"
          content="Exploration 01: lch() Color & Framing"
        />
        <Favicon />
      </Head>

      <div className={styles.root}>
        <div className={styles.frame}>
          <div className={styles.bg} />
        </div>

        <div className={`monospace ${styles.meta}`}>
          <div className="stack">
            <div>
              <strong>Exploration 01</strong>: lch() Color & Framing
            </div>
          </div>

          <div className="stack align-end">
            <div>May 2024</div>
            <div>
              <Link href="/" className={styles.link}>
                Main
              </Link>{' '}
              /{' '}
              <Link href="/explorations/02" className={styles.link}>
                02
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
