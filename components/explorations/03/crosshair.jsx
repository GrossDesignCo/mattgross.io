import * as THREE from 'three';
import { Line } from '@react-three/drei';

/**
 * Utility function that takes in a Vector3 and returns a quaternion that points back towards the origin.
 * @param {THREE.Vector3} point - The point on the sphere surface.
 * @returns {THREE.Quaternion} - The quaternion representing the rotation.
 */
const getRotationTowardsOrigin = (point) => {
  // Normalize the point vector to ensure it lies on the sphere of radius 1
  const normalizedPoint = point.clone().normalize();

  // The vector pointing towards the origin is the negative of the normalized point
  const directionToOrigin = normalizedPoint.clone().negate();

  // Create the default vector representing the "up" direction (0, 1, 0)
  const up = new THREE.Vector3(0, 0, 1);

  // Compute the quaternion that rotates the "up" vector to point towards the origin
  const quaternion = new THREE.Quaternion().setFromUnitVectors(
    up,
    directionToOrigin
  );

  return quaternion;
};

export const Crosshair = ({ position }) => {
  // Create a THREE.Vector3 from the position
  const point = new THREE.Vector3(...position);

  // Get the quaternion rotation
  const rotationQuaternion = getRotationTowardsOrigin(point);

  // Define line points
  const linePointsX = [
    new THREE.Vector3(-0.1, 0, 0).applyQuaternion(rotationQuaternion),
    new THREE.Vector3(0.1, 0, 0).applyQuaternion(rotationQuaternion),
  ];

  const linePointsY = [
    new THREE.Vector3(0, -0.1, 0).applyQuaternion(rotationQuaternion),
    new THREE.Vector3(0, 0.1, 0).applyQuaternion(rotationQuaternion),
  ];

  const linePointsZ = [
    new THREE.Vector3(0, 0, -0.1).applyQuaternion(rotationQuaternion),
    new THREE.Vector3(0, 0, 0.1).applyQuaternion(rotationQuaternion),
  ];

  return (
    <group position={position}>
      <Line points={linePointsX} color="red" lineWidth={2} />
      <Line points={linePointsY} color="blue" lineWidth={2} />
      <Line points={linePointsZ} color="green" lineWidth={2} />
    </group>
  );
};
