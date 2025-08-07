import { useEffect, useState } from "react";
import { useFilmsContext } from "../../context/FilmsContext";
import { useNavigate } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import s from "./Inicio.module.scss";

export default function Inicio() {
  const { films, loading, error, fetchFilms } = useFilmsContext();
  const [selectedFilm, setSelectedFilm] = useState(null);
  const navigate = useNavigate();

  // Carregar filmes e restaurar último selecionado
  useEffect(() => {
    if (films.length === 0) {
      fetchFilms();
    }
  }, []);

  // Quando filmes carregarem, define o selecionado
  useEffect(() => {
    if (films.length > 0) {
      const lastId = localStorage.getItem("lastSelectedFilmId");
      const found = films.find(f => f.id === lastId);
      setSelectedFilm(found || films[0]);
    }
  }, [films]);

  // Persistir seleção de filme
  useEffect(() => {
    if (selectedFilm?.id) {
      localStorage.setItem("lastSelectedFilmId", selectedFilm.id);
    }
  }, [selectedFilm]);

  return (
    <main>
      <Hero
        id={selectedFilm?.id}
        title={selectedFilm?.title}
        autor={selectedFilm?.producer}
        ano={selectedFilm?.release_date}
        rate={selectedFilm?.rt_score}
        description={selectedFilm?.description}
        image={selectedFilm?.movie_banner}
      />
      <h3 className={s.title}>Continuar Assistindo</h3>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro ao carregar filmes.</p>}
      <section className={s.filmsGrid}>
        {films.map(film => (
          <div
            key={film.id}
            className={s.filmCard}
            onClick={() => setSelectedFilm(film)}
          >
            <div className={s.imageWrapper}>
              <img src={film.image} alt={film.title} className={s.filmImage} />
              <button
                className={s.detailsButton}
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  navigate(`/filmes/${film.id}`);
                }}
              >
                Ver detalhes
              </button>
            </div>
            <h4 className={s.filmTitle}>{film.title}</h4>
            <p className={s.filmProducer}>{film.producer}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
