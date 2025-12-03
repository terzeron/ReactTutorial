import { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ErrorMessage from "./ErrorMessage";

const TaskList = () => {
  const [actionError, setActionError] = useState();
  const {
    data: tasks = [],
    loading,
    error,
    setData: setTasks
  } = useFetch("http://localhost:8080/tasks", { defaultValue: [] });

  const handleDelete = async (taskId) => {
    try {
      await fetch(`http://localhost:8080/tasks/${taskId}`, { method: "DELETE" });
      setTasks(prev => prev.filter(task => task.id !== taskId));
      setActionError(undefined);
    } catch (err) {
      setActionError("삭제 실패");
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <ErrorMessage text={error} />;

  return (
    <div>
      <h2>Tasks</h2>
      {actionError && <p style={{ color: "red" }}>{actionError}</p>}
      <Link to="/tasks/new">+ 새 Task</Link>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <Link to={`/tasks/${task.id}/edit`}>
              {task.title}
            </Link>
            <button type="button" onClick={() => handleDelete(task.id)} style={{ marginLeft: 8 }}>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
