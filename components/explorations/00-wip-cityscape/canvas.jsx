import { Canvas } from '@react-three/fiber';
import { useState } from 'react';
import Scene from './scene';

const CanvasWrapper = () => {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <Canvas
      shadows={'soft'}
      className={loaded ? 'loaded' : 'loading'}
      onCreated={() => handleLoad()}
      camera={{ fov: 25 }}
    >
      <Scene />
    </Canvas>
  );
};

export default CanvasWrapper;
