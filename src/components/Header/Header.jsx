import { useState } from 'react';
import userPhoto from '../../assets/user.png';
import logo from '../../assets/Logo.png';
import { Link } from "react-router-dom";
import s from './header.module.scss';
import { BiSolidDownArrow } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';
import { HiMenu, HiX } from 'react-icons/hi';
import { MdHomeFilled, MdSettings } from 'react-icons/md';
import { PiFilmReelFill } from 'react-icons/pi';
import { RiTvFill } from 'react-icons/ri';
import { IoStarSharp } from 'react-icons/io5';
import Sidebar from '../RespondiveSidebar/Sidebar';

export default function Header() {
  // Estado para controlar se o menu está aberto ou fechado iniciando como fechado
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Função para alternar o estado do menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className={s.header}>
        {/* Botão de menu hambúrguer para mobile */}
        <button
          className={s.hamburgerMenu}
          onClick={toggleMenu}
          aria-label="Abrir menu de navegação"
        >
          {/* logica com icones para menu aberto e menu fechado */}
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </button>

        {/* cabeçalho do site */}
        <button className={s.userMenu} aria-label="Menu do usuário">
          <img src={userPhoto} className={s.userPhoto} alt="Foto de perfil do usuário" />
          <BiSolidDownArrow aria-hidden="true" />
        </button>
        <nav>
          {/* links de navegação */}
          <ul className={s.navLinks}>
            <li>
              <Link
                to="/pesquisar"
                className={s.links}
                aria-label="Pesquisar filmes e séries">
                <BsSearch aria-hidden="true" />
              </Link>
            </li>
            <li>
              <Link to="/"
                className={s.links}>
                <MdHomeFilled aria-hidden="true" />
                <span className={s.linkText}>Início</span>
              </Link>
            </li>
            <li>
              <Link
                to="/filmes"
                className={s.links}>
                <PiFilmReelFill aria-hidden="true" />
                <span className={s.linkText}>Filmes</span>
              </Link>
            </li>
            <li>
              <Link to="/series"
                className={s.links}>
                <RiTvFill aria-hidden="true" />
                <span className={s.linkText}>Séries</span>
              </Link>
            </li>
            <li>
              <Link to="/minha-lista"
                className={s.links}>
                <IoStarSharp aria-hidden="true" />
                <span className={s.linkText}>Minha Lista</span>
              </Link>
            </li>
            <li>
              <Link to="/configuracoes"
                className={s.links}>
                <MdSettings aria-hidden="true" />
                <span className={s.linkText}>Configurações</span>
              </Link>
            </li>
          </ul>
        </nav>
        <img src={logo} className={s.logo} alt="Streamflix logo" />
      </header>

      {/* compoenente de menu lateral com os links e info de usuario */}
      <Sidebar isOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </>
  );
}