import { useState, useEffect } from "react";
export function useFetchData<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fechData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Something went wrong.");
        }

        const resData = await response.json();
        setData(resData);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fechData();
  }, [url]);

  return {
    data,
    isLoading,
    error,
  };
}
