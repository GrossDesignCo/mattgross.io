import Head from 'next/head';
import styles from './index.module.css';
import { Link } from '../../../components/link';
import { Meta } from '../../../components/meta';
import { Favicon } from '../../../components/favicon';
import { IconArrowLeft } from '../../../components/icons/arrow-left';
import { IconArrowRight } from '../../../components/icons/arrow-right';
import { DoubleSlash } from '../../../components/double-slash';

export default function Page() {
  return (
    <div>
      <Head>
        <title>Exploration 01 - Matt Gross</title>
        <meta name="description" content="lch() Color & Framing" />
        <Favicon />
      </Head>

      <div className={styles.root}>
        <div className={styles.frame}>
          {/* Just one div to animate on */}
          <div className={styles.bg} />
        </div>

        <Meta
          className={styles.meta}
          title={
            <>
              <strong>Exploration 01</strong>: lch() Color & Framing
            </>
          }
          dateCreated="May 2024"
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
