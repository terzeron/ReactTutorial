import TaskForm from "./TaskForm";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ErrorMessage from "./ErrorMessage";

const TaskEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: task, loading, error } = useFetch(
    id ? `http://localhost:8080/tasks/${id}` : null,
    { defaultValue: null }
  );

  const handleUpdate = async (updated) => {
    const payload = {
      title: updated.title,
      description: updated.description,
      completed: !!updated.completed,
      tags: Array.isArray(updated.tags) ? updated.tags : []
    };
    console.log('PUT /tasks/' + id + ' payload', payload);

    await fetch(`http://localhost:8080/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    navigate("/");
  };

  const handleDelete = async () => {
    await fetch(`http://localhost:8080/tasks/${id}`, {
      method: "DELETE"
    });
    navigate("/");
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <ErrorMessage text={error} />;
  if (!task) return <p>Task 정보를 찾을 수 없습니다.</p>;

  return (
    <div>
      <h2>Task 수정</h2>
      <TaskForm initialValue={task} onSubmit={handleUpdate} />
      <button type="button" onClick={handleDelete} style={{ marginTop: 12 }}>
        삭제
      </button>
    </div>
  );
};

export default TaskEdit;
