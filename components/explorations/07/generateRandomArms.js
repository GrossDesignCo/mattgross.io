// Each arm unit is defined as
// starting angle in radians,
// speed multiplier
// length as a percentage of the viewport size,
// and any child arms
export const generateRandomArms = () => {
  const presetArms = [
    [
      {
        id: 1,
        startAngle: 0,
        speed: 1,
        length: 0.1,
        child: {
          id: 2,
          startAngle: 0,
          speed: 2,
          length: 0.1,
          child: {
            id: 3,
            startAngle: 0,
            speed: 1,
            length: 0.1,
          },
        },
      },
      {
        id: 4,
        startAngle: 0.1,
        speed: 1,
        length: 0.4,
        child: {
          id: 5,
          startAngle: 0,
          speed: 4,
          length: 0.1,
          child: {
            id: 6,
            startAngle: 0,
            speed: 8,
            length: 0.1,
          },
        },
      },
      {
        id: 7,
        startAngle: 0.2,
        speed: 1,
        length: 0.8,
        child: {
          id: 8,
          startAngle: 0,
          speed: 8,
          length: 0.1,
          child: {
            id: 9,
            startAngle: 0,
            speed: 16,
            length: 0.1,
          },
        },
      },
    ],
    [
      {
        id: 1,
        startAngle: 0,
        speed: 1,
        length: 0.12,
        child: {
          id: 2,
          startAngle: 0,
          speed: 1.9,
          length: 0.3,
          child: {
            id: 3,
            startAngle: 0,
            speed: 1.5,
            length: 0.18,
          },
        },
      },
    ],
    [
      {
        id: 1,
        startAngle: 0,
        speed: 1,
        length: 0.25,
        child: {
          id: 2,
          startAngle: 0,
          speed: -1,
          length: 0.5,
          child: {
            id: 3,
            startAngle: 0,
            speed: 4,
            length: 0.125,
            child: {
              id: 4,
              startAngle: 0,
              speed: -1.25,
              length: 0.125,
            },
          },
        },
      },
      {
        id: 5,
        startAngle: Math.PI,
        speed: 1,
        length: 0.25,
        child: {
          id: 6,
          startAngle: Math.PI,
          speed: -1,
          length: 0.5,
          child: {
            id: 7,
            startAngle: Math.PI,
            speed: 4,
            length: 0.125,
            child: {
              id: 8,
              startAngle: Math.PI,
              speed: -1.25,
              length: 0.125,
            },
          },
        },
      },
    ],
    [
      {
        id: 1,
        startAngle: 0,
        speed: 1,
        length: 0.2,
        child: {
          id: 2,
          startAngle: 0,
          speed: 3,
          length: 0.33,
          child: {
            id: 3,
            startAngle: 0,
            speed: -1.05,
            length: 0.2,
          },
        },
      },
      {
        id: 4,
        startAngle: -Math.PI,
        speed: 1,
        length: 0.2,
        child: {
          id: 5,
          startAngle: -Math.PI,
          speed: 3,
          length: 0.33,
          child: {
            id: 6,
            startAngle: -Math.PI,
            speed: -1.05,
            length: 0.2,
          },
        },
      },
    ],
  ];

  return presetArms[Math.floor(presetArms.length * Math.random())];
};
