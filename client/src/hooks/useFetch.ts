import { useEffect, useState } from 'react';

// Define a type for the returned data, you may adjust it according to your actual data structure
type FetchDataType<T> = T | null;

// Define a type for the error
type FetchErrorType = string | null;

function useFetch<T>(url: string) {
  const [data, setData] = useState<FetchDataType<T>>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<FetchErrorType>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
}

export default useFetch;
