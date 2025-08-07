import { useState, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useFilmsContext } from '../../context/FilmsContext';
import s from './pesquisar.module.scss';

// Função para validar e sanitizar URLs de imagem
// Ela verifica se a URL é segura e retorna null se não for
function getSafeImageUrl(url) {
  try {
    if (!url || typeof url !== 'string') return null;
    const normalizedUrl = decodeURIComponent(url.trim().toLowerCase().replace(/\s+/g, ''));
    const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:', 'ftp:'];
    if (dangerousProtocols.some(protocol => normalizedUrl.startsWith(protocol))) {
      return null;
    }
    const u = new URL(url);
    const allowedDomains = [
      'cdn.jsdelivr.net',
      'images.unsplash.com',
      'image.tmdb.org',
      'static.wikia.nocookie.net'
    ];
    const isTrustedDomain = allowedDomains.some(domain => u.hostname.endsWith(domain));
    const isImage = /\.(jpg|jpeg|png|webp|gif)$/i.test(u.pathname);
    const isHttp = u.protocol === 'https:' || u.protocol === 'http:';
    return isTrustedDomain && isImage && isHttp ? url.trim() : null;
  } catch {
    return null;
  }
}

export default function PesquisarFilmesESeries() {
  const { films, loading, error, fetchFilms } = useFilmsContext();
  const [termoPesquisa, setTermoPesquisa] = useState('');

  // Garante que os filmes sejam carregados ao acessar a página
  useEffect(() => {
    if (films.length === 0 && !loading) {
      fetchFilms();
    }
  }, [films.length, loading, fetchFilms]);

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
        <form role="search" onSubmit={e => e.preventDefault()}>
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

      {!termoPesquisa.trim() && (
        <>
          <h2 className={s.sectionTitle}>Títulos populares</h2>
          <section className={s.grid} aria-label="Títulos populares">
            {populares.map(film => {
              const safeImageUrl = getSafeImageUrl(film.image);
              return (
                <figure key={film.id} className={s.card}>
                  {safeImageUrl && (
                    <img
                      src={safeImageUrl}
                      alt={film.title}
                      className={s.poster}
                    />
                  )}
                </figure>
              );
            })}
          </section>
        </>
      )}

      {termoPesquisa.trim() && (
        <section className={s.grid} aria-label="Resultados da pesquisa">
          {resultados.map(film => {
            const safeImageUrl = getSafeImageUrl(film.image);
            return (
              <figure key={film.id} className={s.card}>
                {safeImageUrl && (
                  <img
                    src={safeImageUrl}
                    alt={film.title}
                    className={s.poster}
                  />
                )}
              </figure>
            );
          })}
        </section>
      )}

      {loading && <p className={s.loading}>Carregando...</p>}
      {error && <p className={s.error}>Erro ao carregar filmes.</p>}
      {resultados.length === 0 && termoPesquisa.trim() && !loading && !error && (
        <p className={s.noResults}>Nenhum resultado encontrado.</p>
      )}
    </main>
  );
}