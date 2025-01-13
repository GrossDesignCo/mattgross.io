import Head from 'next/head';
import styles from './index.module.css';
import { Link } from '../../../components/link';
import { Meta } from '../../../components/meta';
import { Favicon } from '../../../components/favicon';
import { IconArrowLeft } from '../../../components/icons/arrow-left';
import { IconArrowRight } from '../../../components/icons/arrow-right';
import { DoubleSlash } from '../../../components/double-slash';
import { DigitalClock } from '../../../components/explorations/digital';

export default function Page() {
  return (
    <div>
      <Head>
        <title>Exploration 07 - Matt Gross</title>
        <meta name="description" content="Digital Clauck" />
        <Favicon />
      </Head>

      <div className={styles.root}>
        <div className={styles.frame}>
          <DigitalClock />
        </div>

        <Meta
          className={styles.meta}
          title={
            <>
              <strong>Exploration 07</strong>: Digital Clauck
            </>
          }
          subTitle={<>Using Claude AI to iteratively create a digital clock</>}
          dateCreated="January 2025"
          links={
            <>
              <Link href="/" className={styles.link}>
                <IconArrowLeft />
                Main
              </Link>{' '}
              <DoubleSlash />{' '}
              <Link href="/explorations/07" className={styles.link}>
                <IconArrowLeft />
                07
              </Link>{' '}
              / 08
            </>
          }
        />
      </div>
    </div>
  );
}
