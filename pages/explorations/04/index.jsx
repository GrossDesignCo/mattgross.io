import Head from 'next/head';
import dynamic from 'next/dynamic';
import styles from './index.module.css';
import { Link } from '../../../components/link';
import { Meta } from '../../../components/meta';
import { Favicon } from '../../../components/favicon';
import { IconArrowLeft } from '../../../components/icons/arrow-left';
import { IconArrowRight } from '../../../components/icons/arrow-right';
import { SettingsProvider } from '../../../components/explorations/04/control-context';
import { ControlPanel } from '../../../components/explorations/04/control-panel';

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
        <meta name="description" content="Radial Scales" />
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
                <strong>Exploration 04</strong>: Radial Scales
              </>
            }
            subTitle={
              <span>
                Inspired by{' '}
                <Link href="https://www.youtube.com/@HerschelShapiro">
                  Hershel
                </Link>
                {`'s`}{' '}
                <Link href="https://www.youtube.com/watch?v=UTK6_9AQjgE">
                  LED Gamble
                </Link>
              </span>
            }
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
      </SettingsProvider>
    </div>
  );
}