import TaskForm from "./TaskForm";
import { useNavigate } from "react-router-dom";

const TaskCreate = () => {
  const navigate = useNavigate();

  const handleCreate = async (task) => {
    // backend expects `tags` as array of names; TaskForm now sends `tags`.
    const payload = {
      title: task.title,
      description: task.description,
      completed: !!task.completed,
      tags: Array.isArray(task.tags) ? task.tags : []
    };
    console.log('POST /tasks payload', payload);

    await fetch("http://localhost:8080/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    navigate("/");
  };

  return (
    <div>
      <h2>새 Task 등록</h2>
      <TaskForm
        initialValue={{ title: "", description: "", completed: false, tagIds: [] }}
        onSubmit={handleCreate}
      />
    </div>
  );
};

export default TaskCreate;