import * as THREE from 'three';

/**
 * Convert lattitude/longitude to a Vector3 for rendering
 * @param {*} lat
 * @param {*} lon
 * @param {*} radius
 * @returns
 */
export const latLonToVector3 = (lat, lon, radius) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
};

// Convert radians <-> degrees
export const degreesToRadians = (degrees) => degrees * (Math.PI / 180);
export const radiansToDegrees = (radians) => radians * (180 / Math.PI);

// size / earth-radius = % (assuming earth radius === 1)
export const kmToEarthRadii = (km) => km / 6371;
