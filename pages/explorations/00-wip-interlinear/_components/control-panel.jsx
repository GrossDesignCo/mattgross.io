import { useContext } from 'react';
import { SettingsContext, dirs, availableLanguages } from './control-context';
import { ControlGroup } from './control-group';

export const ControlPanel = () => {
  const { dir, setDir, selectedLanguages, setLanguages } =
    useContext(SettingsContext);

  return (
    <div className="controls">
      <ControlGroup options={dirs} selected={dir} select={setDir} />
      <ControlGroup
        options={availableLanguages}
        selected={selectedLanguages}
        select={setLanguages}
      />
    </div>
  );
};
