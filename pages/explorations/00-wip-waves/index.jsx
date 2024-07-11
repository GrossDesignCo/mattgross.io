import Head from 'next/head';
import styles from './index.module.css';
import { Link } from '../../../components/link';
import { Meta } from '../../../components/meta';
import { Favicon } from '../../../components/favicon';
import { IconArrowLeft } from '../../../components/icons/arrow-left';
import { IconArrowRight } from '../../../components/icons/arrow-right';
import { DoubleSlash } from '../../../components/double-slash';
import { Canvases } from '../../../components/explorations/00-wip-waves/canvases';

export default function Page() {
  return (
    <div>
      <Head>
        <title>Exploration 00 - Matt Gross</title>
        <meta name="description" content="wave function references" />
        <Favicon />
      </Head>

      <div className={styles.root}>
        <div className={styles.frame}>
          <Canvases />
        </div>

        <Meta
          className={styles.meta}
          title={
            <>
              <strong>Exploration 00</strong>: wave function references
            </>
          }
          dateCreated="June 2024"
          links={
            <>
              <Link href="/" className={styles.link}>
                <IconArrowLeft />
                Main
              </Link>{' '}
              <DoubleSlash />{' '}
              <Link href="/explorations/02" className={styles.link}>
                02
                <IconArrowRight />
              </Link>
            </>
          }
        />
      </div>
    </div>
  );
}
