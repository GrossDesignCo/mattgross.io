import { Canvas } from '@react-three/fiber';
import { createContext, useState } from 'react';
import Scene from './scene';
import Controls from './controls';

export const CanvasContext = createContext();

const CanvasProvider = ({ children }) => {
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const togglePlaying = () => {
    setPlaying((prevPlaying) => !prevPlaying);
  };

  return (
    <CanvasContext.Provider
      value={{ playing, togglePlaying, progress, setProgress }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

const CanvasWithContext = () => {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };
  return (
    <CanvasProvider>
      <Canvas
        className={loaded ? 'loaded' : 'loading'}
        onCreated={() => handleLoad()}
        camera={{ fov: 35 }}
      >
        <Scene />
      </Canvas>

      <Controls />
    </CanvasProvider>
  );
};

export default CanvasWithContext;
