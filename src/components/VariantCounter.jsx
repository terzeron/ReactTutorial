import { useState, useRef } from 'react';

const VariantCounter = () => {
  const [count, setCount] = useState(0);
  const refCount = useRef(0);
  const incrementState = () => {
    setCount(count + 1);
  };
  const incrementRef = () => {
    refCount.current++;
    console.log('refCount.current:', refCount.current);
  };

  return (
    <>
      <div>
        <h3>올바른 카운터 (useState)</h3>
        <div>카운트: {count}</div>
        <button onClick={incrementState}>증가</button>
      </div>
      <div>
        <h3>잘못된 카운터 (useRef)</h3>
        <div>카운트: {refCount.current}</div>
        <button onClick={incrementRef}>증가</button>
      </div>
    </>
  );
};

export default VariantCounter;
