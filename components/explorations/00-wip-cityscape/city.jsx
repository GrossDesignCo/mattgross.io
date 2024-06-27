import { useRef } from 'react';
// import { useFrame } from '@react-three/fiber';
import { Box, Plane } from '@react-three/drei';
import { grid, GRID_SIZE, MAX_HEIGHT } from './data';

const City = () => {
  const cityRef = useRef();

  // useFrame((state, delta) => {
  //   cityRef.current.rotation.y += delta * 0.1;
  // });

  return (
    <>
      <group ref={cityRef}>
        {grid.map((row, rowIndex) => {
          return row.map((scale, colIndex) => (
            <Box
              key={`${rowIndex}-${colIndex}`}
              args={[1, scale * MAX_HEIGHT, 1]}
              position={[
                colIndex * 1.25 - GRID_SIZE / 2,
                scale * MAX_HEIGHT * 0.5,
                rowIndex * 1.25 - GRID_SIZE / 2,
              ]}
              receiveShadow
              castShadow
            >
              <meshStandardMaterial />
            </Box>
          ));
        })}

        <Plane
          args={[GRID_SIZE * 10, GRID_SIZE * 10]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial />
        </Plane>
      </group>
    </>
  );
};

export default City;
