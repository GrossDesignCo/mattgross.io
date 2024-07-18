import { useMemo, useContext, useRef } from 'react';
import { Line, OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Label } from './label';
import { latLonToVector3 } from './utils';
import { starshipTestFlight4Events, earthRadius } from './data';
import { kmToEarthRadii } from './utils';
import { CanvasContext } from './canvas';
import { usePrefersDarkMode } from '../../../hooks/usePrefersDarkMode';

const events = starshipTestFlight4Events.Starship;

const lastEvent = events[events.length - 1];
const totalTimestamp = lastEvent.timestamp;

const progressSpeed = 0.05; // Adjust this value to change the speed of the animation

const Trajectory = ({ earthRef }) => {
  const { camera } = useThree();
  const controls = useRef();
  const { playing, progress, setProgress } = useContext(CanvasContext);
  const prefersDarkMode = usePrefersDarkMode();

  /**
   * Animate progress along the flight path
   * - Update progress each frame
   * - Update camera position based on progress
   */
  useFrame((state, delta) => {
    if (playing) {
      // Update progress
      setProgress((prevProgress) =>
        progress >= 1 ? 0 : prevProgress + delta * progressSpeed
      );

      // Lock camera to the current point along progression
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
  const { points, arcPoints, scaledArcPoints } = useMemo(() => {
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
    // const path = new THREE.QuadraticBezierCurve3(
    //   ...points.map((point) => point.position)
    // );

    const arcPoints = path.getPoints(totalTimestamp);

    // Have to do a path for each object
    // Really have to do a path for each pair of points within that object
    // Draw a line between those two points
    // Use the altitude for the start and end points instead of the 0.1 scale
    // And lerp between the two for each path segment
    const scaledArcPoints = arcPoints.map((point, i) => {
      return point
        .normalize()
        .multiplyScalar(
          earthRadius + 0.04 * Math.sin((Math.PI * i) / totalTimestamp)
        );
    });

    return { path, points, arcPoints, scaledArcPoints };
  }, []);

  const completedPoints = useMemo(() => {
    const index = Math.floor(progress * (totalTimestamp - 1));
    // Points up till the current time
    return scaledArcPoints.slice(0, index);
  }, [progress, scaledArcPoints]);

  const incompletePoints = useMemo(() => {
    const index = Math.floor(progress * (totalTimestamp - 1));
    // Points from current time onward
    return scaledArcPoints.slice(index, totalTimestamp - 1);
  }, [progress, scaledArcPoints]);

  return (
    <>
      <group>
        {/* Points of Interest */}
        {points.map(({ timestamp, position, ...point }, i) => (
          <Label
            key={timestamp}
            position={position}
            earthRef={earthRef}
            {...point}
          />
        ))}

        {/* Completed Path */}
        {completedPoints.length && (
          <Line
            points={completedPoints}
            color={prefersDarkMode ? '#fff' : '#000'}
            lineWidth={1.5}
          />
        )}

        {/* Future Path */}
        {incompletePoints.length && (
          <Line
            points={incompletePoints}
            color={prefersDarkMode ? '#999' : '#aaa'}
            lineWidth={0.75}
          />
        )}

        {/* Approximated Path */}
        {/* {arcPoints.length && (
          <Line points={arcPoints} color="#999" lineWidth={0.75} />
        )} */}
      </group>

      {/* Keep orbit controls here so it can directly reference the camera settings */}
      <OrbitControls
        ref={controls}
        args={[camera]}
        enableRotate={!playing}
        enableZoom={!playing}
        maxDistance={earthRadius * 5}
        minDistance={earthRadius * 1.25}
        enablePan={false}
        maxPolarAngle={Math.PI / 1.25}
        minPolarAngle={Math.PI / 4}
      />
    </>
  );
};

export default Trajectory;
