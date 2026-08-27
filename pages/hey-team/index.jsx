import Head from 'next/head';
import { Favicon } from '../../components/favicon';
import { Deck } from '../../components/hey-team/deck';
import { slides } from '../../components/hey-team/slides';
import styles from './index.module.css';

export default function HeyTeam() {
  return (
    <div className={styles.root}>
      <Head>
        <title>Hey Team - Matt Gross</title>
        <meta name="robots" content="noindex, nofollow" />
        <Favicon />
      </Head>

      <Deck slides={slides} />
    </div>
  );
}
