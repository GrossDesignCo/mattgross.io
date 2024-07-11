import { useRef } from 'react';
// import { useFrame } from '@react-three/fiber';
import { Sphere, Outlines, useTexture, Line } from '@react-three/drei';
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

        <Trajectory earthRef={earthRef} />
      </group>
    </>
  );
};

export default Earth;
