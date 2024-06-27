import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import City from './city';
import Sun from './sun';
import { GRID_SIZE } from './data';

const Scene = () => {
  return (
    <>
      <ambientLight intensity={2} color="rgb(71, 30, 92)" />
      {/* <directionalLight position={[5, 2, 2]} intensity={3} /> */}

      {/* Sun */}
      <Sun />

      <City />

      <OrbitControls
        position={[GRID_SIZE * 0.5, 10, GRID_SIZE * 0.5]}
        target={[0, 5, 0]}
        enableRotate={true}
        rotateSpeed={1}
        // autoRotate
        // autoRotateSpeed={-0.25}
        enableZoom={true}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={0}
      />
    </>
  );
};

export default Scene;
