import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFilmsContext } from "../../context/FilmsContext";
import s from "./detalhes.module.scss";

export default function FilmesDetalhes() {
  const { id } = useParams();
  const { films, fetchFilms, loading, error } = useFilmsContext();
  const navigate = useNavigate();

  // Garante que os filmes sejam carregados ao acessar a página
  useEffect(() => {
    if (films.length === 0 && !loading) {
      fetchFilms();
    }
  }, [films.length, loading, fetchFilms]);

  const film = films.find(f => f.id === id);

  if (loading) {
    return <main><p>Carregando...</p></main>;
  }

  if (error) {
    return <main><p>Erro ao carregar filme.</p></main>;
  }

  if (!film) {
    return (
      <main>
        <h2>Filme não encontrado</h2>
        <button onClick={() => navigate(-1)}>Voltar</button>
      </main>
    );
  }

  return (
    <main className={s.detalhesContainer}>
      <section className={s.imageSection}>
        <img
          src={film.image}
          alt={`Poster de ${film.title}`}
          className={s.moviePoster}
        />
      </section>
      <section className={s.detailsSection}>
        <button onClick={() => navigate(-1)} className={s.voltarButton}>Voltar</button>
        <h1>{film.title}</h1>
        <h3><strong>Diretor:</strong> {film.director}</h3>
        <span><strong>Produtor:</strong> {film.producer}</span>
        <span><strong>Ano:</strong> {film.release_date}</span>
        <span><strong>Duração:</strong> {film.running_time} min</span>
        <p className={s.description}><strong>Sinopse:</strong> {film.description}</p>
      </section>
    </main>
  );
}