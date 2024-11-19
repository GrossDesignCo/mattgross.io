import Head from 'next/head';
import styles from './index.module.css';
import { Link } from '../../../components/link';
import { Meta } from '../../../components/meta';
import { Favicon } from '../../../components/favicon';
import { IconArrowLeft } from '../../../components/icons/arrow-left';
import { IconArrowRight } from '../../../components/icons/arrow-right';
import { DoubleSlash } from '../../../components/double-slash';
import { Canvas } from '../../../components/explorations/00-wip-procgen/canvas';

export default function Page() {
  return (
    <div>
      <Head>
        <title>Exploration 00 - Matt Gross</title>
        <meta name="description" content="ProcGen" />
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
              <strong>Exploration 00</strong>: ProcGen
            </>
          }
          subTitle={<>A landscaping project</>}
          dateCreated="September 2024"
          links={
            <>
              <Link href="/" className={styles.link}>
                <IconArrowLeft />
                Main
              </Link>{' '}
              <DoubleSlash />{' '}
              <Link href="/explorations/07" className={styles.link}>
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
