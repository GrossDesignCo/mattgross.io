import { useContext } from 'react';
import { SettingsContext, patterns } from './control-context';
import { ControlGroup } from './control-group';
import styles from './04.module.css';
import { ControlRange } from './control-range';

export const ControlPanel = () => {
  const {
    pattern,
    setPattern,
    layerCount,
    setLayerCount,
    petalCount,
    setPetalCount,
  } = useContext(SettingsContext);

  return (
    <div className={styles.controlPanel}>
      <ControlGroup options={patterns} selected={pattern} select={setPattern} />

      {/* TODO: Maybe figure out animating ins and outs of tiles before giving the user control? */}
      {/* <ControlRange
        min={4}
        max={36}
        select={(value) => {
          setLayerCount(parseInt(value));
        }}
        value={layerCount}
        label="layers"
      />

      <ControlRange
        min={4}
        max={36}
        select={(value) => {
          setPetalCount(parseInt(value));
        }}
        value={petalCount}
        label="petals"
      /> */}
    </div>
  );
};
