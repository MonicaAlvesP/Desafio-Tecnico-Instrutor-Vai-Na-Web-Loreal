import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useFilmsContext } from '../../context/FilmsContext';
import s from './pesquisar.module.scss';

export default function PesquisarFilmesESeries() {
  const { films, loading, error } = useFilmsContext();
  const [termoPesquisa, setTermoPesquisa] = useState('');

  // Busca titulos case-insensitive
  const resultados = termoPesquisa.trim()
    ? films.filter(film =>
      film.title.toLowerCase().includes(termoPesquisa.toLowerCase())
    )
    : [];

  // Populares: maiores rates, até 12
  const populares = films
    .slice()
    .sort((a, b) => Number(b.rt_score) - Number(a.rt_score))
    .slice(0, 12);

  return (
    <main className={s.container}>
      <header>
        <form className={s.searchBar} role="search" onSubmit={e => e.preventDefault()}>
          <div className={s.inputContainer}>
            <BsSearch className={s.searchIcon} />
            <input
              type="search"
              placeholder="Digite o nome do filme ou série..."
              value={termoPesquisa}
              onChange={e => setTermoPesquisa(e.target.value)}
              className={s.searchInput}
              aria-label="Pesquisar filmes e séries"
              autoFocus
            />
          </div>
        </form>
      </header>

      <section className={s.results}>
        {/* mostra filmes populares se não houver busca */}
        {termoPesquisa.trim() === '' && (
          <>
            <header className={s.popularSection}>
              <h3 style={{ marginLeft: 0 }}>Títulos Populares</h3>
            </header>
            <section className={s.grid} aria-label="Títulos populares">
              {populares.map(film => (
                <figure key={film.id} className={s.card}>
                  <div className={s.posterContainer}>
                    <img src={film.image} alt={film.title} className={s.poster} />
                  </div>
                </figure>
              ))}
            </section>
          </>
        )}
        {/* Resultados de busca */}
        {termoPesquisa.trim() && loading && (
          <div className={s.loading}>Carregando...</div>
        )}
        {termoPesquisa.trim() && error && (
          <div className={s.error}>Erro ao carregar filmes.</div>
        )}
        {termoPesquisa.trim() && !loading && resultados.length === 0 && (
          <div className={s.noResults}>Nenhum filme encontrado.</div>
        )}
        {resultados.length > 0 && (
          <section className={s.grid} aria-label="Resultados da pesquisa">
            {resultados.map(film => (
              <figure key={film.id} className={s.card}>
                  <img src={film.image} alt={film.title} className={s.poster} />
              </figure>
            ))}
          </section>
        )}
      </section>
    </main>
  );
}
