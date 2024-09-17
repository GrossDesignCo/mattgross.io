import Head from 'next/head';
import styles from './index.module.css';
import { Link } from '../../../components/link';
import { Meta } from '../../../components/meta';
import { Favicon } from '../../../components/favicon';
import { IconArrowLeft } from '../../../components/icons/arrow-left';
import { IconArrowRight } from '../../../components/icons/arrow-right';
import { DoubleSlash } from '../../../components/double-slash';
import { Canvas } from '../../../components/explorations/06/canvas';

export default function Page() {
  return (
    <div>
      <Head>
        <title>Exploration 06 - Matt Gross</title>
        <meta name="description" content="Dahlia" />
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
              <strong>Exploration 06</strong>: Dahlia
            </>
          }
          subTitle="Work in Progress, canvas, lerps"
          dateCreated="July 2024"
          links={
            <>
              <Link href="/" className={styles.link}>
                <IconArrowLeft />
                Main
              </Link>{' '}
              <DoubleSlash />{' '}
              <Link href="/explorations/05" className={styles.link}>
                <IconArrowLeft />
                05
              </Link>{' '}
              / 06 /{' '}
              <Link href="/explorations/07" className={styles.link}>
                07
                <IconArrowRight />
              </Link>
            </>
          }
        />
      </div>
    </div>
  );
}
