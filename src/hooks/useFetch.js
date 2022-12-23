import { useCallback, useState } from "react";

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);
  const [isSuccessed, setIsSuccessed] = useState(false);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? requestConfig.body : null,
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const responseData = await response.json();
      if (typeof applyData !== "undefined") {
        applyData(responseData);
      }

      setIsSuccessed(true);
    } catch (e) {
      setHttpError(e.message);
    }
    setIsLoading(false);
  }, []);

  return { isLoading, isSuccessed, httpError, sendRequest };
};

export default useFetch;
