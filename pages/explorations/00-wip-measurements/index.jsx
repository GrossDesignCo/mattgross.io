import Head from 'next/head';
import styles from './index.module.css';
import { Link } from '../../../components/link';
import { Meta } from '../../../components/meta';
import { Favicon } from '../../../components/favicon';
import { IconArrowLeft } from '../../../components/icons/arrow-left';
import { IconArrowRight } from '../../../components/icons/arrow-right';

export default function Page() {
  return (
    <div>
      <Head>
        <title>Exploration 00 - Matt Gross</title>
        <meta name="description" content="Measurements" />
        <Favicon />
      </Head>

      <div className={styles.root}>
        <div className={styles.frame}>
          <div className="row">
            <div className={styles.em}>
              <div className={styles.char}>m</div>
              <div className={styles.ruler} />
              <div className="caption">em</div>
            </div>

            <div className={styles.ch}>
              <div className={styles.char}>0</div>
              <div className={styles.ruler} />
              <div className="caption">ch</div>
            </div>

            <div className={styles.ex}>
              <div className={styles.char}>x</div>
              <div className={styles.ruler} />
              <div className="caption">ex</div>
            </div>
          </div>

          <div className="stack">
            <div className={styles.cap}>
              <div className={styles.char}>Aa</div>
              <div className={styles['vertical-ruler']} />
              <div className="caption">cap</div>
            </div>

            <div className={styles.lh}>
              <div className={styles.char}>Gg</div>
              <div className={styles['vertical-ruler']} />
              <div className="caption">lh</div>
            </div>
          </div>
        </div>

        <Meta
          className={styles.meta}
          title={
            <>
              <strong>Exploration 00</strong>: Measurements
            </>
          }
          subTitle="WIP: Thinking about visualization of css unit types"
          dateCreated="June 2024"
          links={
            <>
              <Link href="/" className={styles.link}>
                <IconArrowLeft /> Main
              </Link>{' '}
              /{' '}
              <Link href="/explorations/02" className={styles.link}>
                <IconArrowLeft />
                02
              </Link>{' '}
              /{' '}
              <Link href="/explorations/04" className={styles.link}>
                <IconArrowRight />
                04
              </Link>
            </>
          }
        />
      </div>
    </div>
  );
}
