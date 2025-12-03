import React, { useRef } from 'react';

const InputFocus = () => {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>포커스 이동</button>
    </>
  );
};

export default InputFocus;