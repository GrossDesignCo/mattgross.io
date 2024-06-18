import { useMemo, useState, useContext, useRef } from 'react';
import { Line, OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Label } from './label';
// import { Crosshair } from './crosshair';
import { latLonToVector3 } from './utils';
import {
  // falcon9EstimatedEvents as events,
  starshipTestFlight4Events as events,
  earthRadius,
} from './data';
import { kmToEarthRadii } from './utils';
import { CanvasContext } from './canvas';

const lastEvent = events[events.length - 1];
const totalTimestamp = lastEvent.timestamp;

const progressSpeed = 0.05; // Adjust this value to change the speed of the animation

const Trajectory = () => {
  const { camera } = useThree();
  const controls = useRef();
  const { playing, progress, setProgress } = useContext(CanvasContext);

  const reset = () => {
    setProgress(0);
  };

  /**
   * Animate progress along the flight path
   */
  useFrame((state, delta) => {
    if (playing) {
      setProgress((prevProgress) =>
        progress >= 1 ? 0 : prevProgress + delta * progressSpeed
      );
      const targetPoint = completedPoints[completedPoints.length - 1] ??
        points[0].position ?? [0, 0, 0];

      const normalizedPoint = new THREE.Vector3(...targetPoint).normalize();
      const cameraDistance = 2; // Adjust as needed

      // Calculate the direction vector from the origin to the target point
      const direction = normalizedPoint.clone().normalize();

      // Move the camera back along the direction vector and down to achieve the look-up angle
      const lookUpAngle = Math.PI / 6; // 30 degrees in radians
      const yOffset = Math.sin(lookUpAngle) * cameraDistance;
      const xyOffset = Math.cos(lookUpAngle) * cameraDistance;

      const currentCameraPosition = new THREE.Vector3(...camera.position);
      const targetCameraPosition = direction.clone().multiplyScalar(xyOffset);
      targetCameraPosition.y -= yOffset;

      const lerpFactor = 1; // 1 for no inertia to camera, animation is smooth enough and the extra movement of earth is disorienting
      // Would be better to lerp the rotational angle of the camera instead of it's raw position
      // so that it stays in place relative to the earth
      const cameraPosition = currentCameraPosition.lerp(
        targetCameraPosition,
        lerpFactor
      );

      camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
      camera.lookAt(normalizedPoint);
      controls.current.target.set(
        normalizedPoint.x,
        normalizedPoint.y,
        normalizedPoint.z
      );
      controls.current.update();
    }
  });

  /**
   * Plot the path of the major events
   */
  const { points, scaledArcPoints } = useMemo(() => {
    // Convert the events to usable positions
    const points = events.map(({ lat, lon, altitude, ...event }) => {
      return {
        position: latLonToVector3(
          lat,
          lon,
          earthRadius + kmToEarthRadii(altitude ?? 0)
        ),
        ...event,
      };
    });

    // Get a single path from the list of points
    const path = new THREE.CatmullRomCurve3(
      points.map((point) => point.position),
      false, // closed
      'catmullrom',
      0.1 // tension
    );

    const arcPoints = path.getPoints(totalTimestamp);
    const scaledArcPoints = arcPoints.map((point, i) => {
      return point
        .normalize()
        .multiplyScalar(
          earthRadius + 0.1 * Math.sin((Math.PI * i) / totalTimestamp)
        );
    });

    return { path, points, arcPoints, scaledArcPoints };
  }, []);

  const completedPoints = useMemo(() => {
    const index = Math.floor(progress * (totalTimestamp - 1));
    return scaledArcPoints.slice(0, index);
  }, [progress, scaledArcPoints]);

  const incompletePoints = useMemo(() => {
    const index = Math.floor(progress * (totalTimestamp - 1));
    return scaledArcPoints.slice(index, totalTimestamp - 1);
  }, [progress, scaledArcPoints]);

  return (
    <>
      <group>
        {/* Improved Path */}
        {points.map(({ timestamp, position, ...point }, i) => {
          console.log(i === 0 ? { point, position } : '');
          return (
            <>
              {/* <Crosshair position={position} /> */}
              <Label key={timestamp} position={position} {...point} />
            </>
          );
        })}
        {completedPoints.length && (
          <Line points={completedPoints} color="#fff" lineWidth={1.5} />
        )}
        {incompletePoints.length && (
          <Line points={incompletePoints} color="#999" lineWidth={0.75} />
        )}
      </group>

      {/* Keep orbit controls here so it can reference the rocket path */}
      <OrbitControls
        ref={controls}
        args={[camera]}
        enableRotate={true}
        rotateSpeed={1}
        enableZoom={true}
        // zoom0={100}
        // zoomSpeed={1}
        maxDistance={earthRadius * 5}
        minDistance={earthRadius * 1.25}
        enablePan={false}
        maxPolarAngle={Math.PI / 1.25}
        minPolarAngle={Math.PI / 4}
        // autoRotate={true}
        // autoRotateSpeed={-1}
      />
    </>
  );
};

export default Trajectory;
