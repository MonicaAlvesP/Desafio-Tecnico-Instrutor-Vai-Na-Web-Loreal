import { useEffect } from "react";
import { useFilmsContext } from "../../context/FilmsContext";
import s from "./minhaLista.module.scss";

export default function MinhaLista() {
  const { films, myList, fetchFilms, loading, error } = useFilmsContext();

  // Carregar filmes quando o componente montar se não estiverem carregados
  useEffect(() => {
    if (films.length === 0) {
      fetchFilms();
    }
  }, [films.length, fetchFilms]);

  // Filtra apenas os filmes que estão na lista de favoritos
  const favoritosFiltrados = films.filter(film => myList.includes(film.id));

  return (
    <div className={s.container}>
      <h3 className={s.title}>Minha Lista</h3>

      {loading && <p className={s.loading}>Carregando filmes...</p>}
      {error && <p className={s.error}>Erro ao carregar filmes.</p>}

      {!loading && !error && favoritosFiltrados.length === 0 && (
        <p className={s.empty}>Sua lista de favoritos está vazia.</p>
      )}

      {!loading && !error && favoritosFiltrados.length > 0 && (
        <div className={s.grid}>
          {favoritosFiltrados.map(film => (
            <div key={film.id} className={s.card}>
              <img src={film.image} alt={film.title} className={s.poster} />
              <h3 className={s.filmTitle}>{film.title}</h3>
              <p className={s.filmInfo}>{film.release_date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}