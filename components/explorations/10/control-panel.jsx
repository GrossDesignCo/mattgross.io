import { useContext } from 'react';
import { SettingsContext, layouts } from './control-context';
import { ControlGroup } from './control-group';
import { HarmonicControl } from './harmonic-control';
import { useHarmonicIntro } from './use-harmonic-intro';
import styles from './10.module.css';

export const ControlPanel = () => {
  useHarmonicIntro();
  const { layout, setLayout } = useContext(SettingsContext);

  return (
    <div className={styles.controlPanel}>
      <ControlGroup options={layouts} selected={layout} select={setLayout} />
      <HarmonicControl />
    </div>
  );
};
