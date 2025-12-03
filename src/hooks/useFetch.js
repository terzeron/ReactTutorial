import { useEffect, useState } from "react";

const useFetch = (url, { defaultValue = null, enabled = true } = {}) => {
  const [data, setData] = useState(defaultValue);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState();

  useEffect(() => {
    if (!enabled || !url) {
      setLoading(false);
      return;
    }

    let aborted = false;
    setLoading(true);
    setError(undefined);

    (async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("요청 실패");
        }
        const json = await res.json();
        if (!aborted) {
          setData(json);
        }
      } catch (err) {
        if (!aborted) {
          setError(err.message || "요청 실패");
        }
      } finally {
        if (!aborted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      aborted = true;
    };
  }, [url, enabled]);

  return { data, loading, error, setData };
};

export default useFetch;
