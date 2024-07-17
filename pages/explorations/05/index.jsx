import Head from 'next/head';
import styles from './index.module.css';
import { Link } from '../../../components/link';
import { Meta } from '../../../components/meta';
import { Favicon } from '../../../components/favicon';
import { IconArrowLeft } from '../../../components/icons/arrow-left';
import { DoubleSlash } from '../../../components/double-slash';
import { Canvas } from '../../../components/explorations/05/canvas';

export default function Page() {
  return (
    <div>
      <Head>
        <title>Exploration 05 - Matt Gross</title>
        <meta name="description" content="Compounding Spirals" />
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
              <strong>Exploration 05</strong>: Compounding Spirals
            </>
          }
          subTitle="On HTML Canvas, Maths & Data Vis"
          dateCreated="June 2024"
          links={
            <>
              <Link href="/" className={styles.link}>
                <IconArrowLeft />
                Main
              </Link>{' '}
              <DoubleSlash />{' '}
              <Link href="/explorations/04" className={styles.link}>
                <IconArrowLeft />
                04
              </Link>
            </>
          }
        />
      </div>
    </div>
  );
}
