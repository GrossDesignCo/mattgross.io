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
        <meta name="description" content="Systematic Notches" />
        <Favicon />
      </Head>

      <div className={styles.root}>
        <div className={cx(styles.frame, 'stack')}>
          {/* Example UI Outline */}
          <div
            className={cx(
              styles.header,
              styles.notch,
              styles.notchBottomCenter
            )}
          >
            <div
              className={cx(
                styles.headerInner,
                styles.notch,
                styles.notchBottomCenter
              )}
            >
              <div className={styles.headerDemoContent} />
            </div>
          </div>

          {/* Notch Semi-Exhaustive Tests */}
          <div className={styles.bricks}>
            {[
              styles.notchTopLeft,
              styles.notchTopRight,
              styles.notchBottomLeft,
              styles.notchBottomRight,
              styles.notchTopCenter,
              styles.notchBottomCenter,
              styles.notchCenterLeft,
              styles.notchCenterRight,
            ].map((className) => (
              <div
                key={className}
                className={cx(styles.brick, styles.notch, className)}
              />
            ))}

            <div
              className={cx(
                styles.brick,
                styles.notch,
                styles.notchTopLeft,
                styles.notchTopRight,
                styles.notchBottomLeft,
                styles.notchBottomRight
              )}
            />
            <div
              className={cx(
                styles.brick,
                styles.notch,
                styles.notchTopCenter,
                styles.notchBottomCenter,
                styles.notchCenterLeft,
                styles.notchCenterRight
              )}
            />
            <div
              className={cx(
                styles.brick,
                styles.notch,
                styles.notchTopLeft,
                styles.notchTopRight,
                styles.notchBottomLeft,
                styles.notchBottomRight,
                styles.notchTopCenter,
                styles.notchBottomCenter,
                styles.notchCenterLeft,
                styles.notchCenterRight
              )}
            />
          </div>
        </div>

        <Meta
          className={styles.meta}
          title={
            <>
              <strong>Exploration 00</strong>: Systematic Notches
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
