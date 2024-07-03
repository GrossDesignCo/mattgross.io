import { formatRgb } from 'culori';
import { useState, useContext, useRef } from 'react';
import { SettingsContext } from './control-context';
import { useFrame } from '@react-three/fiber';

import { Petal } from './petal';
import { useDarkMode } from '../../../hooks/useDarkMode';

const Display = () => {
  const { pattern } = useContext(SettingsContext);
  const display = useRef();
  const prefersDarkMode = useDarkMode();

  useFrame((state, delta) => {
    display.current.rotation.z += delta * 0.1;
  });

  // Configs/knobs
  const centerRadius = 2;
  // Petals arranged into radially tesselating layers
  const layerCount = 24;
  const petalCount = 32;
  // Radial space between petals
  const angle = (Math.PI * 2) / petalCount;

  // Start building data
  const layers = new Array(layerCount).fill(0);

  let prevPetalDepth = 0;
  for (let i = 0; i < layers.length; i++) {
    // Get the previous layer's petalSize to adjust this layer's radius
    // Create a new array of angles and a radius to position items around the circle
    const radius = centerRadius + prevPetalDepth;
    const circumference = radius * 2 * Math.PI;
    // Petal size
    const petalWidth = circumference / petalCount;
    // Need the basic dimensions for each petal
    const petalDepth = petalWidth * 0.5;

    // Steps should move counterclockwise a half angle with each layer
    const steps = new Array(petalCount).fill(0).map((value, j) => {
      const colors = {
        // Rainbow flowing around the center axis
        conic: `lch(50 100 ${(360 / petalCount) * j})`,
        // Rainbow flowing out from the center
        radial: `lch(50 100 ${(360 / layerCount) * i})`,
        none: prefersDarkMode ? '#fff' : '#000',
      };
      const color = colors[pattern];

      return {
        // Increment the rotation forward with each layer so that
        // the "front" lines up with each petal in a symmetric swoosh pattern
        stepAngle: (j + i / 2) * angle,
        stepColor: formatRgb(color),
      };
    });

    layers[i] = { radius, petalWidth, petalDepth, steps };

    // Save this petal size to adjust the next layer
    prevPetalDepth = petalDepth + prevPetalDepth;
  }

  return (
    <>
      <group rotation={[-Math.PI / 2, 0, 0]} ref={display}>
        {/* Rings */}
        {layers.map(({ radius, petalWidth, steps }, i) => (
          <group key={radius}>
            {/* Petals */}
            {steps.map(({ stepAngle, stepColor }, j) => (
              <group
                key={`${radius}-${stepAngle}`} // Ensure each object has a unique key
                rotation={[Math.PI / 2, stepAngle, 0]} // Rotate each Petal around the y-axis
              >
                <group position={[radius, 0, 0]}>
                  <Petal size={petalWidth} color={stepColor} />
                </group>
              </group>
            ))}
          </group>
        ))}
      </group>
    </>
  );
};

export default Display;
