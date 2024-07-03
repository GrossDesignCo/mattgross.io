import { useContext } from 'react';
import { SettingsContext, patterns } from './control-context';
import { ControlGroup } from './control-group';
import styles from './04.module.css';

export const ControlPanel = () => {
  const { pattern, setPattern } = useContext(SettingsContext);

  return (
    <div className={styles.controlPanel}>
      <ControlGroup options={patterns} selected={pattern} select={setPattern} />
    </div>
  );
};
