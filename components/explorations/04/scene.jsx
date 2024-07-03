import { OrbitControls, Grid } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import Display from './display';

const Scene = () => {
  const { camera } = useThree();

  camera.position.set(0, 150, 0);
  camera.lookAt([0, 0, 0]);

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 2, 2]} intensity={0.5} />

      <Display />
      {/* <Grid args={[10, 10]} /> */}

      <OrbitControls
        enableRotate={true}
        rotateSpeed={1}
        // autoRotate
        // autoRotateSpeed={-0.25}
        enableZoom={true}
        enablePan={false}
      />
    </>
  );
};

export default Scene;
