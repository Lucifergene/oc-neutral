import React, { useEffect, useRef, useState } from "react";

export default function useResourceFetch(
  url: string,
  loading: React.MutableRefObject<boolean>
) {
  const [resources, setResources] = useState<any>([]);
  const [error, setError] = useState<any>({
    message: "",
    status: false,
  });

  useEffect(() => {
    const fetchResources = async () => {
      loading.current = true;
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("data: ", data);
          setResources(data);
          loading.current = false;
          setError({ message: "", status: false });
        })
        .catch((err) => {
          console.log("err: ", err);
          loading.current = false;
          setError({ message: err.message, status: true });
          setResources(null);
        });
      loading.current = false;
    };
    fetchResources();
  }, [error]);

  return [resources, error];
}
