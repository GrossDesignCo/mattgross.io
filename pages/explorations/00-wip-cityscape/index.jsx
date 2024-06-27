import Head from 'next/head';
import dynamic from 'next/dynamic';
import styles from './index.module.css';
import { Link } from '../../../components/link';
import { Meta } from '../../../components/meta';
import { Favicon } from '../../../components/favicon';
import { IconArrowLeft } from '../../../components/icons/arrow-left';
import { IconArrowRight } from '../../../components/icons/arrow-right';

// Only import 3d space client-side to avoid SSR issues
const Canvas = dynamic(
  () => import('../../../components/explorations/04/canvas'),
  {
    ssr: false,
  }
);

export default function Page() {
  return (
    <div>
      <Head>
        <title>Exploration 04 - Matt Gross</title>
        <meta name="description" content="Cityscape" />
        <Favicon />
      </Head>

      <div className={styles.root}>
        <div className={styles.frame}>
          <Canvas />
        </div>

        <Meta
          className={styles.meta}
          title={
            <>
              <strong>Exploration 04</strong>: Cityscape
            </>
          }
          subTitle="Work in Progress"
          dateCreated="June 2024"
          links={
            <>
              <Link href="/" className={styles.link}>
                <IconArrowLeft /> Main
              </Link>{' '}
              /{' '}
              <Link href="/explorations/03" className={styles.link}>
                <IconArrowLeft />
                03
              </Link>
            </>
          }
        />
      </div>
    </div>
  );
}
