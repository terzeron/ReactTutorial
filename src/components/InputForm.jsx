import { useState } from "react";

const InputForm = () => {
  const [text, setText] = useState("");

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p>입력 값: {text}</p>
    </div>
  );
};

export default InputForm;