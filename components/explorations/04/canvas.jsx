import { Canvas } from '@react-three/fiber';
import { useState } from 'react';
import {
  ColorManagement,
  LinearDisplayP3ColorSpace,
  LinearEncoding,
} from 'three';
import Scene from './scene';

// ColorManagement.legacyMode = false;
// ColorManagement.convertSRGBToLinear = false;
// ColorManagement.convertGammaToLinear = true;

const CanvasWrapper = () => {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <Canvas
      className={loaded ? 'loaded' : 'loading'}
      onCreated={() => handleLoad()}
      camera={{ fov: 25 }}
      // gl={{
      //   outputEncoding: LinearDisplayP3ColorSpace,
      //   colorSpace: 'display-p3', // Configure the color space to use P3
      // }}
    >
      <Scene />
    </Canvas>
  );
};

export default CanvasWrapper;
