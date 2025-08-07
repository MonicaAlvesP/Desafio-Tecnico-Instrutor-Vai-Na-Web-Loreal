
import { useFilmsContext } from "../../context/FilmsContext";
import s from "./Hero.module.scss";

export default function Hero({ title, autor, ano, rate, description, image, id }) {
  const { watchedFilms, myList, toggleWatched, toggleMyList } = useFilmsContext();
  const watched = watchedFilms.includes(id);
  const addedToList = myList.includes(id);

  const handleWatchNow = () => {
    toggleWatched(id);
  };

  const handleAddToList = () => {
    toggleMyList(id);
  };

  return (
    <main className={s.hero}>
      <section className={s.heroContent}>
        <h1>{title}</h1>
        <p>{autor} - {ano}</p>
        <div className={s.stars}>
          {[...Array(5)].map((_, index) => (
            <span key={index} className={s.star}>
              {index < Math.round((rate / 10) * 5) ? "★" : "☆"}
            </span>
          ))}
        </div>
        <p className={s.description}>{description}</p>
        <div className={s.actions}>
          <button onClick={handleWatchNow}>
            ▶ {watched ? "Continuar assistindo" : "Assistir agora"}
          </button>
          <button onClick={handleAddToList}>
            ★ {addedToList ? "Remover da lista" : "Adicionar à lista"}
          </button>
        </div>
      </section>
      <section className={s.heroImage}>
        <img src={image} alt={`${title} poster`} />
      </section>
    </main>
  );
}