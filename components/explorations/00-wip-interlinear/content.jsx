import styles from './00.module.css';
import { useContext } from 'react';
import cx from 'classnames';
import { SettingsContext } from './control-context';
import { Book } from './book';
import { ChapterHeading } from './chapter-heading';
import { content } from './_content';

export const Content = () => {
  const { dir } = useContext(SettingsContext);

  return (
    <main className={cx(styles.content, styles[`dir-${dir}`])} dir={dir}>
      {/* Chapter heading should always be top-bottom */}
      <ChapterHeading />

      <div className={styles.text}>
        {/* Map over each paragraph/caption/poem/line */}
        {content.map(({ book, chapters }) => {
          return <Book key={`book-${book}`} book={book} chapters={chapters} />;
        })}
      </div>
    </main>
  );
};
