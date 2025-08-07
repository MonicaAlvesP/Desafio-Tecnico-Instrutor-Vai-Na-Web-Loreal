import { createContext, useContext, useState } from "react";
import { getFilms } from "../services/api";

export const FilmsContext = createContext();


export function AppProvider({ children }) {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [watchedFilms, setWatchedFilms] = useState([]); // array de ids
  const [myList, setMyList] = useState([]); // array de ids

  // Função para buscar filmes da API
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

  // Marcar/desmarcar como assistido
  const toggleWatched = (id) => {
    setWatchedFilms((prev) =>
      prev.includes(id) ? prev.filter(filmId => filmId !== id) : [...prev, id]
    );
  };

  // Adicionar/remover da lista
  const toggleMyList = (id) => {
    setMyList((prev) =>
      prev.includes(id) ? prev.filter(filmId => filmId !== id) : [...prev, id]
    );
  };

  return (
    <FilmsContext.Provider value={{
      films,
      loading,
      error,
      fetchFilms,
      watchedFilms,
      myList,
      toggleWatched,
      toggleMyList
    }}>
      {children}
    </FilmsContext.Provider>
  );
}

// Hook para usar o contexto facilmente
export function useFilmsContext() {
  return useContext(FilmsContext);
}