import { useState, useRef } from 'react';

export const useStateWithRef = (initialState) => {
  const [state, setState] = useState(initialState);
  const stateRef = useRef();

  // Save the new state to an independent ref so it can be accessed
  // even from inside tricky useEffects
  stateRef.current = state;

  return [state, setState, stateRef];
};
