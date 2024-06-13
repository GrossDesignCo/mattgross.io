import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import { OrthographicCamera } from '@react-three/drei';
import Earth from './earth';

const Scene = () => {
  return (
    <>
      {/* <ambientLight intensity={0.5} /> */}
      {/* <directionalLight position={[5, 0, 0]} intensity={3} /> */}
      <Earth position={[0, 0, 0]} />
      {/* <OrthographicCamera makeDefault /> */}
    </>
  );
};

export default Scene;
