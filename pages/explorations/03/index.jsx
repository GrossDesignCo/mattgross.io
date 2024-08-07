import Head from 'next/head';
import dynamic from 'next/dynamic';
import styles from './index.module.css';
import { Link } from '../../../components/link';
import { Meta } from '../../../components/meta';
import { Favicon } from '../../../components/favicon';
import { IconArrowLeft } from '../../../components/icons/arrow-left';
import { IconArrowRight } from '../../../components/icons/arrow-right';
import { DoubleSlash } from '../../../components/double-slash';

// Only import 3d space client-side to avoid SSR issues
const Canvas = dynamic(
  () => import('../../../components/explorations/03/canvas'),
  {
    ssr: false,
  }
);

export default function Page() {
  return (
    <div>
      <Head>
        <title>Exploration 03 - Matt Gross</title>
        <meta name="description" content="Three.js + R3F + Context" />
        <Favicon />
      </Head>

      <div className={styles.root}>
        <div className={styles.frame}>
          <Canvas />
          {/* <div className={styles.visualFrame} /> */}
        </div>

        <Meta
          className={styles.meta}
          title={
            <>
              <strong>Exploration 03</strong>: Three.js + R3F + Context
            </>
          }
          subTitle="Work in Progress, Starship Test Flight 4 Timeline"
          dateCreated="June 2024"
          links={
            <>
              <Link href="/" className={styles.link}>
                <IconArrowLeft /> Main
              </Link>{' '}
              <DoubleSlash />{' '}
              <Link href="/explorations/02" className={styles.link}>
                <IconArrowLeft />
                02
              </Link>{' '}
              / 03 /{' '}
              <Link href="/explorations/04" className={styles.link}>
                04
                <IconArrowRight />
              </Link>
            </>
          }
        />
      </div>
    </div>
  );
}
