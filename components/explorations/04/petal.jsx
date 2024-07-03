import { Cone, Outlines } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo } from 'react';

import { LED } from './led';

export const Petal = ({ size, color }) => {
  // Diameter of the cone/width of the zone from corner to corner
  const xOffset = size / 2;

  return (
    // Overall group position (distance from circle center)
    <group>
      <group position={[xOffset, 0, 0]} scale={size}>
        <mesh rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[0.5, 0.1, 0.5]} />
          <meshBasicMaterial color={color} />
        </mesh>
        {/* Vertical fan for the petal */}
        {/* <Cone
          args={[0.5, 1, 4]}
          position={[-0.1, 0.3, 0]}
          scale={[0.25, 1, 1]}
          rotation={[0, 0, -1]}
        >
          <meshPhysicalMaterial color="#fff" />
        </Cone> */}
        {/* Pseudo-flat base for the petal */}
        {/* <Cone args={[0.5, 0.25, 4]} position={[-0.5, 0.125, 0]}>
          <meshPhysicalMaterial color="#fff" />
        </Cone> */}
      </group>

      {/* <LED
        color={color}
        intensity={size * size * 0.75}
        position={[(-1 * size) / 2 + 0.1, 0.1, 0]}
      /> */}
    </group>
  );
};
