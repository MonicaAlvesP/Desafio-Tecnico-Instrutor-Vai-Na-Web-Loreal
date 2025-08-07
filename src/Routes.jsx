import { Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio/Inicio";
import PesquisarFilmesESeries from "./pages/Pesquisar/PesquisarFilmesESeries";
import Filmes from "./pages/Filmes/Filmes";
import Series from "./pages/Series/Series";
import MinhaLista from "./pages/MinhaLista/MinhaLista";
import Configuracao from "./pages/Configuracao/Configuracao";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

export default function RoutesApp() {
  return (
    <Routes>
      <Route path="/pesquisar" element={<PesquisarFilmesESeries />} />
      <Route path="/" element={<Inicio />} />
      <Route path="/filmes" element={<Filmes />} />
      <Route path="/series" element={<Series />} />
      <Route path="/minha-lista" element={<MinhaLista />} />
      <Route path="/configuracoes" element={<Configuracao />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
