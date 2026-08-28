import Head from 'next/head';
import styles from './index.module.css';
import { Link } from '../../../components/link';
import { Meta } from '../../../components/meta';
import { Favicon } from '../../../components/favicon';
import { IconArrowLeft } from '../../../components/icons/arrow-left';
import { DoubleSlash } from '../../../components/double-slash';
import { Demo } from '../../../components/explorations/11/Demo';

export default function Page() {
  return (
    <div>
      <Head>
        <title>Exploration 11 - Matt Gross</title>
        <meta name="description" content="Dynamic Heading" />
        <Favicon />
      </Head>

      <div className={styles.root}>
        <div className={styles.frame}>
          <Demo />
        </div>

        <Meta
          className={styles.meta}
          title={
            <>
              <strong>Exploration 11</strong>: Dynamic Heading
            </>
          }
          subTitle={<>Typography, Adaptive Design</>}
          dateCreated="August 2026"
          links={
            <>
              <Link href="/" className={styles.link}>
                <IconArrowLeft />
                Main
              </Link>{' '}
              <DoubleSlash />{' '}
              <Link href="/explorations/10" className={styles.link}>
                <IconArrowLeft />
                10
              </Link>{' '}
              / 11
            </>
          }
        />
      </div>
    </div>
  );
}
