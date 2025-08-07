import { useFilmsContext } from "../../context/FilmsContext";
import s from "../Inicio/inicio.module.scss";

export default function MinhaLista() {
  const { films, myList } = useFilmsContext();
  const filmesNaLista = films.filter(film => myList.includes(film.id));

  return (
    <main>
      <header>
        <h1>Minha Lista</h1>
      </header>
      {filmesNaLista.length === 0 ? (
        <p>Sua lista está vazia.</p>
      ) : (
        <section className={s.filmsGrid}>
          {filmesNaLista.map(film => (
            <article key={film.id} className={s.filmCard}>
              <img src={film.image} alt={film.title} className={s.filmImage} />
              <h4 className={s.filmTitle}>{film.title}</h4>
              <p className={s.filmProducer}>{film.producer}</p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}