import { Sphere } from '@react-three/drei';

export const LED = ({ on, color, position, intensity }) => {
  const radius = 0.075;

  return (
    <group position={position}>
      {/* <pointLight args={[color, intensity, 0]} /> */}

      {/* Offset y pos by radius to position right on midpoint */}
      <Sphere args={[radius, 10, 10]}>
        <meshStandardMaterial color={color} emissive={color} />
      </Sphere>
    </group>
  );
};
