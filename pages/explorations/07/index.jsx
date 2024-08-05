import Head from 'next/head';
import styles from './index.module.css';
import { Link } from '../../../components/link';
import { Meta } from '../../../components/meta';
import { Favicon } from '../../../components/favicon';
import { IconArrowLeft } from '../../../components/icons/arrow-left';
import { IconArrowRight } from '../../../components/icons/arrow-right';
import { DoubleSlash } from '../../../components/double-slash';
import { Canvas } from '../../../components/explorations/07/canvas';

export default function Page() {
  return (
    <div>
      <Head>
        <title>Exploration 07 - Matt Gross</title>
        <meta name="description" content="Spirograph / Fourier Patterns" />
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
              <strong>Exploration 07</strong>: Spirograph / Fourier Patterns
            </>
          }
          subTitle={
            <>
              Inspired by{' '}
              <Link href="https://www.youtube.com/watch?v=spUNpyF58BY">
                @3Blue1Brown
              </Link>{' '}
              &{' '}
              <Link href="https://www.youtube.com/@WangBaoWei">
                @WangBaoWei
              </Link>
            </>
          }
          dateCreated="July 2024"
          links={
            <>
              <Link href="/" className={styles.link}>
                <IconArrowLeft />
                Main
              </Link>{' '}
              <DoubleSlash />{' '}
              <Link href="/explorations/06" className={styles.link}>
                <IconArrowLeft />
                06
              </Link>{' '}
              / 07
            </>
          }
        />
      </div>
    </div>
  );
}
