import { Html, Line } from '@react-three/drei';
import styles from './3d.module.css';

export const Label = ({ position, label, caption, time }) => {
  return (
    <>
      <Line points={[position, [0, 0, 0]]} color="#444" lineWidth={0.75} />
      <Html
        position={position}
        className={`monospace ${styles.label}`}
        distanceFactor={1}
        // occlude={[earthRef]}
      >
        <div>
          <strong>
            {label ? `${label}, ` : ''}
            {time}
          </strong>
        </div>

        <div>{caption}</div>
      </Html>
    </>
  );
};
