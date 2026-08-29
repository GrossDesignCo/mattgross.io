import Head from 'next/head';
import styles from './index.module.css';
import { Link } from '../../../components/link';
import { Meta } from '../../../components/meta';
import { Favicon } from '../../../components/favicon';
import { IconArrowLeft } from '../../../components/icons/arrow-left';
import { DoubleSlash } from '../../../components/double-slash';
import { Canvas } from '../../../components/explorations/10/canvas';
import { IconArrowRight } from '../../../components/icons/arrow-right';
import { SettingsProvider } from '../../../components/explorations/10/control-context';
import { ControlPanel } from '../../../components/explorations/10/control-panel';

export default function Page() {
  return (
    <div>
      <Head>
        <title>Exploration 10 - Matt Gross</title>
        <meta name="description" content="Harmonic Sum" />
        <Favicon />
      </Head>

      <SettingsProvider>
        <div className={styles.root}>
          <div className={styles.frame}>
            <Canvas />
          </div>

          <ControlPanel />

          <Meta
          className={styles.meta}
          title={
            <>
              <strong>Exploration 10</strong>: Harmonics
            </>
          }
          subTitle={<>Stacked Waves, HTML Canvas, Motion</>}
          dateCreated="August 2026"
          links={
            <>
              <Link href="/" className={styles.link}>
                <IconArrowLeft />
                Main
              </Link>{' '}
              <DoubleSlash />{' '}
              <Link href="/explorations/09" className={styles.link}>
                <IconArrowLeft />
                09
              </Link>{' '}
              / 10 /{' '}
              <Link href="/explorations/11" className={styles.link}>
                11
                <IconArrowRight />
              </Link>
            </>
          }
          />
        </div>
      </SettingsProvider>
    </div>
  );
}
