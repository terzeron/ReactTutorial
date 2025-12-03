import { useState } from "react";

const TagCreate = ({ onCreated = () => {} }) => {
  const [name, setName] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    await fetch("http://localhost:8080/tags", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });

    setName("");
    onCreated(); // 목록 새로고침
  };

  return (
    <form onSubmit={handleCreate}>
      <input
        value={name}
        placeholder="새 태그"
        onChange={e => setName(e.target.value)}
      />
      <button type="submit">추가</button>
    </form>
  );
};

export default TagCreate;
