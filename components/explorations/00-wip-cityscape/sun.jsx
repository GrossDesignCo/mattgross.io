import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { GRID_SIZE, MAX_HEIGHT } from './data';
import { useRef, useState } from 'react';

// Compute position along an angled circular track mimicking a stylized day/night cycle
const getSunPosition = (rotationY, tiltAngle, orbitRadius) => {
  return [
    Math.cos(rotationY) * orbitRadius,
    Math.sin(rotationY) * tiltAngle + Math.cos(rotationY),
    Math.sin(rotationY) * orbitRadius,
  ];
};

const Sun = () => {
  const sun = useRef();
  const [rotationY, setRotationY] = useState(0);
  const orbitRadius = GRID_SIZE * 3;
  const tiltAngle = MAX_HEIGHT * 1.1;
  const position = getSunPosition(rotationY, tiltAngle, orbitRadius);

  useFrame((state, delta) => {
    // setRotationY((prevRotationY) =>
    //   prevRotationY > MAX_HEIGHT * 1.1 ? 0 : prevRotationY + delta * 0.025
    // );

    const position = getSunPosition(rotationY, tiltAngle, orbitRadius);

    // Move the sun
    if (sun.currrent) sun.currrent.position = position;
  });

  return (
    <>
      <group ref={sun}>
        <Sphere args={[3, 32, 32]} position={position}>
          <meshBasicMaterial color="orange" />
        </Sphere>
        {/* <pointLight
          position={position}
          castShadow
          intensity={2000}
          shadow-mapSize={[1024, 1024]}
          color="orange"
        /> */}

        <directionalLight
          position={position}
          castShadow
          intensity={10}
          shadow-mapSize={[1024, 1024]}
          shadow-radius={100}
          color="orange"
        >
          <orthographicCamera
            attach="shadow-camera"
            args={[-100, 100, 100, -100]}
          />
        </directionalLight>
      </group>
    </>
  );
};

export default Sun;
