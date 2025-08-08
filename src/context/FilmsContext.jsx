import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { getFilms } from "../services/api";

export const FilmsContext = createContext();

export function AppProvider({ children }) {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [myList, setMyList] = useState(() => {
    const savedList = localStorage.getItem("myList");
    return savedList ? JSON.parse(savedList) : [];
  });

  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(myList));
  }, [myList]);

  const fetchFilms = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFilms();
      setFilms(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleMyList = (id) => {
    setMyList((prev) =>
      prev.includes(id) ? prev.filter(filmId => filmId !== id) : [...prev, id]
    );
  };

  const value = useMemo(() => ({
    films,
    loading,
    error,
    fetchFilms,
    myList,
    toggleMyList
  }), [films, loading, error, myList]);

  return (
    <FilmsContext.Provider value={value}>
      {children}
    </FilmsContext.Provider>
  );
}

export function useFilmsContext() {
  return useContext(FilmsContext);
}