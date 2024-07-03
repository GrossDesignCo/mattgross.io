import { useEffect, useId, useState, useRef } from 'react';
import styles from './00.module.css';

export const Word = ({ word, selectedLanguages }) => {
  const languages = Object.keys(word);
  const id = useId();
  const [expanded, setExpanded] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if (expanded) {
      const handleclickOutside = (e) => {
        if (!ref.current.contains(e.target)) {
          setExpanded(false);
        }
      };
      addEventListener('click', handleclickOutside);

      return () => {
        removeEventListener('click', handleclickOutside);
      };
    }
  });

  return (
    <span
      ref={ref}
      className={styles.word}
      onDoubleClick={() => setExpanded(true)}
    >
      {/* Map over each version of this word */}
      {languages.map((lang, i) => {
        const isEnabled = expanded || selectedLanguages.includes(lang);

        return isEnabled ? (
          <span key={`${id}-${i}`} className={styles.language} lang={lang}>
            {word[lang]}
          </span>
        ) : null;
      })}
    </span>
  );
};
