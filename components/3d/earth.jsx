import { useRef } from 'react';
// import { useFrame } from '@react-three/fiber';
import { Sphere, Outlines, useTexture } from '@react-three/drei';
import Trajectory from './trajectory';
import { earthRadius } from './data';

const Earth = () => {
  const earthRef = useRef();
  // White image functions as a mask for color
  const texture = useTexture(
    '/explorations/3d/equirectangular-earth-map-white.png'
  );
  const styles = getComputedStyle(document.querySelector(`[class*='root']`));
  const bg = styles.getPropertyValue('--bg');
  const bgMidtone = styles.getPropertyValue('--bg-midtone');

  // useEffect(() => {
  //   const svgLoader = new SVGLoader();
  //   const textureLoader = new TextureLoader();

  //   const texture = svgLoader.load('/explorations/3d/earth.svg', (data) => {
  //     const svg = data.paths[0].userData.node;
  //     const xml = new XMLSerializer().serializeToString(svg);
  //     const svg64 = btoa(xml);
  //     const image64 = `data:image/svg+xml;base64,${svg64}`;

  //     return textureLoader.load(image64, (texture) => texture);
  //   });

  //   textureRef.current = texture;
  // }, [textureRef]);

  // useFrame((state, delta) => {
  //   earthRef.current.rotation.y += delta * 0.1;
  // });

  return (
    <>
      <group ref={earthRef}>
        {/* Outline */}
        <mesh>
          <sphereGeometry args={[earthRadius - 0.001, 64, 64]} />
          <Outlines thickness={0.001 + 0.0025} color={bgMidtone} />
        </mesh>

        {/* Base Color Sphere */}
        <Sphere args={[earthRadius, 64, 64]}>
          <meshBasicMaterial color="#222" />
          {/* <MeshReflectorMaterial color="#333" mirror={1} /> */}
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
