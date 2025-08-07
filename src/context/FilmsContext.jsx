import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { getFilms } from "../services/api";

export const FilmsContext = createContext();


export function AppProvider({ children }) {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Carregue a lista de favoritos do localStorage ao inicializar
  const [myList, setMyList] = useState(() => {
    const savedList = localStorage.getItem("myList");
    return savedList ? JSON.parse(savedList) : [];
  });

  // Salve a lista de favoritos no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(myList));
  }, [myList]);

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

  // Adicionar/remover da lista
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

// Hook para usar o contexto facilmente
export function useFilmsContext() {
  return useContext(FilmsContext);
}