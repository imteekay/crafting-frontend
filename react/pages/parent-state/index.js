import { useState } from 'react';

const Child = ({ updateState }) => (
  <button onClick={() => updateState((state) => state + 1)}>+</button>
);

const Parent = () => {
  const [state, setState] = useState(0);

  return (
    <div>
      {state}
      <Child updateState={setState} />
    </div>
  );
};

export default Parent;
