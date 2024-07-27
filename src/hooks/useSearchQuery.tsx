import { useState, useEffect } from "react";

function useSearchQuery(
  key: string,
  initialValue: string,
): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? storedValue : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, searchQuery);

    return () => {
      localStorage.setItem(key, searchQuery);
    };
  }, [key, searchQuery]);

  return [searchQuery, setSearchQuery];
}

export default useSearchQuery;
