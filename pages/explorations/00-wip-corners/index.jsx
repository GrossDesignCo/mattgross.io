import Head from 'next/head';
import cx from 'classnames';
import styles from './index.module.css';
import { Link } from '../../../components/link';
import { Meta } from '../../../components/meta';
import { Favicon } from '../../../components/favicon';
import { IconArrowLeft } from '../../../components/icons/arrow-left';

export default function Page() {
  return (
    <div>
      <Head>
        <title>Exploration 00 - Matt Gross</title>
        <meta name="description" content="Clip Paths" />
        <Favicon />
      </Head>

      <div className={styles.root}>
        <div className={cx(styles.frame, 'stack')}>
          {/* Basic Clips */}
          <div className={styles.grid}>
            <div
              className={cx(
                styles.brick,
                styles.clipAngle45,
                styles.clipTopLeft
              )}
            />
            <div
              className={cx(
                styles.brick,
                styles.clipAngle45,
                styles.clipTopRight
              )}
            />
            <div
              className={cx(
                styles.brick,
                styles.clipAngle45,
                styles.clipBottomLeft
              )}
            />
            <div
              className={cx(
                styles.brick,
                styles.clipAngle45,
                styles.clipBottomRight
              )}
            />
            <div
              className={cx(
                styles.brick,
                styles.clipAngle45,
                styles.clipBottomLeft,
                styles.clipBottomRight
              )}
            />
            <div
              className={cx(
                styles.brick,
                styles.clipAngle45,
                styles.clipTopLeft,
                styles.clipTopRight
              )}
            />
            <div
              className={cx(
                styles.brick,
                styles.clipAngle45,
                styles.clipTopLeft,
                styles.clipTopRight,
                styles.clipBottomLeft,
                styles.clipBottomRight
              )}
            />
          </div>

          {/* Outlines */}
          <div className={styles.grid}>
            <div
              className={cx(
                styles.brick,
                styles.outline,
                styles.outlineTopLeft,
                styles.clipTopLeft
              )}
            />
            <div
              className={cx(
                styles.brick,
                styles.outline,
                styles.outlineTopRight,
                styles.clipTopRight
              )}
            />
            <div
              className={cx(
                styles.brick,
                styles.outline,
                styles.outlineBottomLeft,
                styles.clipBottomLeft
              )}
            />
            <div
              className={cx(
                styles.brick,
                styles.outline,
                styles.outlineBottomRight,
                styles.clipBottomRight
              )}
            />
          </div>

          {/* Square Loops :) */}
          <div className={cx(styles.brick, styles.squareLoop)} />
        </div>

        <Meta
          className={styles.meta}
          title={
            <>
              <strong>Exploration 00</strong>: Clip Paths
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
