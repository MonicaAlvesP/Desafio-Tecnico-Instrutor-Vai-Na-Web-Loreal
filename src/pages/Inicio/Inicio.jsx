import { useEffect, useState, useRef } from "react";
import { useFilmsContext } from "../../context/FilmsContext";
import { useNavigate } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import s from "./inicio.module.scss";

export default function Inicio() {
  const { films, loading, error, fetchFilms } = useFilmsContext();
  const [selectedFilm, setSelectedFilm] = useState(null);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const rowRefs = [useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    if (films.length === 0) {
      fetchFilms();
    }
  }, []);

  useEffect(() => {
    if (films.length > 0) {
      const lastId = localStorage.getItem("lastSelectedFilmId");
      const found = films.find(f => f.id === lastId);
      setSelectedFilm(found || films[0]);

      const itemsPerCategory = Math.ceil(films.length / 3);
      setCategories([
        {
          title: "Filmes Populares",
          films: films.slice(0, itemsPerCategory)
        },
        {
          title: "Clássicos",
          films: films.slice(itemsPerCategory, itemsPerCategory * 2)
        },
        {
          title: "Recomendados para Você",
          films: films.slice(itemsPerCategory * 2)
        }
      ]);
    }
  }, [films]);

  useEffect(() => {
    if (selectedFilm?.id) {
      localStorage.setItem("lastSelectedFilmId", selectedFilm.id);
    }
  }, [selectedFilm]);

  const scrollRow = (index, direction) => {
    if (rowRefs[index].current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      rowRefs[index].current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

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

      {loading && <p>Carregando...</p>}
      {error && <p>Erro ao carregar filmes.</p>}

      {categories.map((category, index) => (
        <section key={index} className={s.categoryContainer}>
          <header className={s.title}>
            <h3>{category.title}</h3>
          </header>
          <nav className={s.rowControls} aria-label={`Navegação de ${category.title}`}>
            <button
              className={`${s.scrollButton} ${s.leftButton}`}
              onClick={() => scrollRow(index, 'left')}
              aria-label="Rolar para esquerda"
            >
              &lt;
            </button>
            <div ref={rowRefs[index]} className={s.filmsRow} role="list">
              {category.films.map(film => (
                <article
                  key={film.id}
                  className={s.filmCard}
                  onClick={() => setSelectedFilm(film)}
                  role="listitem"
                >
                  <figure className={s.imageWrapper}>
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
                  </figure>
                  <h3 className={s.filmTitle}>{film.title}</h3>
                  <p className={s.filmProducer}>{film.producer}</p>
                </article>
              ))}
            </div>
            <button
              className={`${s.scrollButton} ${s.rightButton}`}
              onClick={() => scrollRow(index, 'right')}
              aria-label="Rolar para direita"
            >
              &gt;
            </button>
          </nav>
        </section>
      ))}
    </main>
  );
}
