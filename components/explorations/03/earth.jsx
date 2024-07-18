import { useRef } from 'react';
// import { useFrame } from '@react-three/fiber';
import { Sphere, Outlines, useTexture, Line, Circle } from '@react-three/drei';
import * as THREE from 'three';
import Trajectory from './trajectory';
import { earthRadius } from './data';

const Earth = () => {
  const earthRef = useRef();
  // White image functions as a mask for color
  const texture = useTexture(
    '/explorations/03/equirectangular-earth-map-white.png'
  );
  const styles = getComputedStyle(document.querySelector(`[class*='root']`));
  const bg = styles.getPropertyValue('--bg');
  const bgMidtone = styles.getPropertyValue('--bg-midtone');

  const equatorCurve = new THREE.EllipseCurve(
    // x/y
    0,
    0,
    // x/y radii
    earthRadius * 1.2,
    earthRadius * 1.2,
    // start/end angle
    0,
    Math.PI * 2,
    false,
    Math.PI / 2
  );
  const equatorPoints = equatorCurve.getPoints(64);

  return (
    <>
      <group>
        {/* Outline */}
        <mesh>
          <sphereGeometry args={[earthRadius - 0.001, 64, 64]} />
          <Outlines thickness={0.001 + 0.0025} color={bgMidtone} />
        </mesh>

        {/* Base Color Sphere */}
        {/* earthRef on the basic sphere is best for occlusion performance of the event labels */}
        <Sphere args={[earthRadius, 64, 64]} ref={earthRef}>
          <meshBasicMaterial color="#222" />
        </Sphere>

        {/* Transparent Texture Sphere */}
        <Sphere args={[earthRadius + 0.001, 64, 64]}>
          <meshBasicMaterial
            map={texture}
            color={bgMidtone}
            transparent
            opacity={1}
          />
        </Sphere>

        {/* Equator Line */}
        {/* <Line
          points={equatorPoints}
          color={bgMidtone}
          lineWidth={0.5}
          rotation={[Math.PI / 2, 0, 0]}
        />

        <Circle
          args={[earthRadius * 1.2, 64, 64]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshBasicMaterial
            color={bgMidtone}
            side={THREE.DoubleSide}
            transparent
            opacity={0.1}
          />
        </Circle> */}

        <Trajectory earthRef={earthRef} />
      </group>
    </>
  );
};

export default Earth;
