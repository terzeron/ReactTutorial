import { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import ErrorMessage from './ErrorMessage';

const TaskForm = ({ initialValue = {}, onSubmit }) => {
  const [title, setTitle] = useState(initialValue.title ?? '');
  const [description, setDescription] = useState(
    initialValue.description ?? ''
  );
  const [completed, setCompleted] = useState(initialValue.completed ?? false);
  const [tagIds, setTagIds] = useState(() => {
    if (Array.isArray(initialValue.tagIds))
      return initialValue.tagIds.map((id) => Number(id));
    if (Array.isArray(initialValue.tags))
      return initialValue.tags.map((t) => Number(t.id));
    return [];
  });
  const {
    data: tags = [],
    loading: tagsLoading,
    error: tagsError
  } = useFetch('http://localhost:8080/tags', { defaultValue: [] });

  useEffect(() => {
    setTitle(initialValue.title ?? '');
    setDescription(initialValue.description ?? '');
    setCompleted(initialValue.completed ?? false);

    if (Array.isArray(initialValue.tagIds)) {
      setTagIds(initialValue.tagIds.map((id) => Number(id)));
      return;
    }

    if (Array.isArray(initialValue.tags)) {
      if (
        initialValue.tags.length > 0 &&
        typeof initialValue.tags[0] === 'object'
      ) {
        setTagIds(initialValue.tags.map((t) => Number(t.id)));
        return;
      }

      if (tags && tags.length > 0) {
        const nameToId = new Map(tags.map((t) => [t.name, Number(t.id)]));
        const ids = initialValue.tags
          .map((name) => nameToId.get(name))
          .filter(Boolean);
        setTagIds(ids);
        return;
      }
    }

    setTagIds([]);
  }, [initialValue, tags]);

  const toggleTag = (id) => {
    const numId = Number(id);
    setTagIds((prev) => {
      const current = Array.isArray(prev) ? prev.map((x) => Number(x)) : [];
      return current.includes(numId)
        ? current.filter((t) => t !== numId)
        : [...current, numId];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedTagNames = tagIds
      .map((id) => {
        const found = tags.find((t) => Number(t.id) === Number(id));
        return found ? found.name : null;
      })
      .filter(Boolean);

    onSubmit({
      title,
      description,
      completed,
      tags: selectedTagNames,
    });
  };

  if (tagsError) {
    return <ErrorMessage text={tagsError} />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Title'
        />
      </div>
      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Description'
        />
      </div>
      <div>
        <label>
          <input
            type='checkbox'
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          완료 여부
        </label>
      </div>
      <h4>Tags</h4>
      <div>
        {tagsLoading && <p>태그 로딩 중...</p>}
        {tagsError && <p style={{ color: 'red' }}>{tagsError}</p>}
        {!tagsLoading &&
          tags.map((tag) => (
            <label key={tag.id}>
              <input
                type='checkbox'
                checked={tagIds.includes(Number(tag.id))}
                onChange={() => toggleTag(tag.id)}
              />
              {tag.name}
            </label>
          ))}
      </div>
      <div>
        <button type='submit'>저장</button>
      </div>
    </form>
  );
};

export default TaskForm;
