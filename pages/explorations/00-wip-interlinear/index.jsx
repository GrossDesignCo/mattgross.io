import Head from 'next/head';
import cx from 'classnames';
import styles from './index.module.css';
import { Link } from '../../../components/link';
import { Meta } from '../../../components/meta';
import { Favicon } from '../../../components/favicon';
import { IconArrowLeft } from '../../../components/icons/arrow-left';
import { SettingsProvider } from './_components/control-context';
import { ControlPanel } from './_components/control-panel';
import { Content } from './_components/content';

export default function Page() {
  return (
    <div>
      <Head>
        <title>Exploration 00 - Matt Gross</title>
        <meta name="description" content="Directional Type" />
        <Favicon />
      </Head>

      <div className={styles.root}>
        <div className={cx(styles.frame, 'stack')}>
          {/* Add a dir class for supporting mixed directions (?) */}
          <SettingsProvider>
            <Content />

            <ControlPanel />
          </SettingsProvider>
        </div>

        <Meta
          className={styles.meta}
          title={
            <>
              <strong>Exploration 00</strong>: Directional Type
            </>
          }
          dateCreated="June 2024"
          links={
            <>
              <Link href="/" className={styles.link}>
                <IconArrowLeft />
                Main
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
