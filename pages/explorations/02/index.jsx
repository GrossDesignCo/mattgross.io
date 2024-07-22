import Head from 'next/head';
import styles from './index.module.css';
import { Link } from '../../../components/link';
import { Meta } from '../../../components/meta';
import { Favicon } from '../../../components/favicon';
import { IconArrowLeft } from '../../../components/icons/arrow-left';
import { IconArrowRight } from '../../../components/icons/arrow-right';
import { DoubleSlash } from '../../../components/double-slash';

export default function Page() {
  return (
    <div>
      <Head>
        <title>Exploration 02 - Matt Gross</title>
        <meta name="description" content="Stacked Conic Gradients" />
        <Favicon />
      </Head>

      <div className={styles.root}>
        <div className={styles.frame}>
          {/* Stack of divs for each ring */}
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

        <Meta
          className={styles.meta}
          title={
            <>
              <strong>Exploration 02</strong>: Stacked Conic Gradients
            </>
          }
          subTitle={
            <>
              Based on{' '}
              <Link
                href="https://x.com/FonsMans/status/1795025314810409342"
                className={styles.link}
              >
                Endless
              </Link>{' '}
              by <Link href="https://x.com/FonsMans">Fons Mans</Link>
            </>
          }
          dateCreated="May 2024"
          links={
            <>
              <Link href="/" className={styles.link}>
                <IconArrowLeft /> Main
              </Link>{' '}
              <DoubleSlash />{' '}
              <Link href="/explorations/01" className={styles.link}>
                <IconArrowLeft />
                01
              </Link>{' '}
              / 02 /{' '}
              <Link href="/explorations/03" className={styles.link}>
                03
                <IconArrowRight />
              </Link>
            </>
          }
        />
      </div>
    </div>
  );
}
