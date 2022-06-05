import { useState, useContext, createContext } from 'react';

const CountContext = createContext();

const CountWrapper = () => {
  const [count, increment] = useState(0);

  return (
    <CountContext.Provider value={{ count, increment }}>
      <Count />
      <IncrementButton />
    </CountContext.Provider>
  );
};

const Count = () => {
  const { count } = useContext(CountContext);
  return <p>Count: {count}</p>;
};

const IncrementButton = () => {
  const { count, increment } = useContext(CountContext);
  return <button onClick={() => increment(count + 1)}>Increment</button>;
};

export default CountWrapper;
