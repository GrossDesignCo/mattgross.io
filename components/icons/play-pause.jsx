import cx from 'classnames';

export const IconPlayPause = ({ paused }) => {
  return (
    <svg
      className={cx('icon', paused ? 'play' : 'pause')}
      viewBox="0 0 21 21"
      xmlns="http://www.w3.org/2000/svg"
    >
      {paused ? (
        <polygon
          points="4,2 18,10.5 4,19"
          strokeLinejoin="round"
          className="shape"
          vector-effect="non-scaling-stroke"
        />
      ) : (
        <>
          <polygon
            points="3,2 8,2 8,19 3,19"
            strokeLinejoin="round"
            className="shape"
            vector-effect="non-scaling-stroke"
          />
          <polygon
            points="18,2 18,19 13,19 13,2"
            strokeLinejoin="round"
            className="shape"
            vector-effect="non-scaling-stroke"
          />
        </>
      )}
      {/* TODO: Animate the play/pause transition, check out SMIL, js, maybe mini-canvas lol */}
    </svg>
  );
};
