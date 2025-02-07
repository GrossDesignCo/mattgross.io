import Head from 'next/head';
import styles from './index.module.css';
import { Link } from '../../../components/link';
import { Meta } from '../../../components/meta';
import { Favicon } from '../../../components/favicon';
import { IconArrowLeft } from '../../../components/icons/arrow-left';
import { IconArrowRight } from '../../../components/icons/arrow-right';
import { DoubleSlash } from '../../../components/double-slash';
import { Gallery } from '../../../components/explorations/gallery/gallery';

export default function Page() {
  return (
    <div>
      <Head>
        <title>Exploration 09 - Matt Gross</title>
        <meta name="description" content="The Smoothness" />
        <Favicon />
      </Head>

      <div className={styles.root}>
        <div className={styles.frame}>
          {/* Make a gallery inside a container query */}
          {/* Make it resizeable */}
          {/* Make labels for each section */}
          {/* Make them horizontal when not active, vertical when active */}
          {/* In portrait orientations swap so the sections are a vertical stack instead of columns */}
          <Gallery />
        </div>

        <Meta
          className={styles.meta}
          title={
            <>
              <strong>Exploration 09</strong>: The Smoothness
            </>
          }
          subTitle={<>Multi-section Gallery, Container Queries, Resizing</>}
          dateCreated="February 2025"
          links={
            <>
              <Link href="/" className={styles.link}>
                <IconArrowLeft />
                Main
              </Link>{' '}
              <DoubleSlash />{' '}
              <Link href="/explorations/08" className={styles.link}>
                <IconArrowLeft />
                08
              </Link>{' '}
              / 09
            </>
          }
        />
      </div>
    </div>
  );
}
