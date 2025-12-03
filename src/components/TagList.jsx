import TagCreate from './TagCreate.jsx';
import useFetch from "../hooks/useFetch";
import ErrorMessage from "./ErrorMessage";

const TagList = () => {
  const { data: tags = [], loading, error } = useFetch(
    "http://localhost:8080/tags",
    { defaultValue: [] }
  );

  if (loading) return <p>로딩 중...</p>;
  if (error) return <ErrorMessage text={error} />;

  return (
    <div>
      <h2>Tags</h2>
      <TagCreate />

      <ul>
        {tags.map(tag => (
          <li key={tag.id}>
            {tag.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagList;
