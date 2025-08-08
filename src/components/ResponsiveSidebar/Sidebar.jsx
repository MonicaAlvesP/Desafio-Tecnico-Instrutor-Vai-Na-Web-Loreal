import { Link } from "react-router-dom";
import userPhoto from '../../assets/user.png';
import { BiSolidDownArrow } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';
import { MdHomeFilled, MdSettings } from 'react-icons/md';
import { PiFilmReelFill } from 'react-icons/pi';
import { RiTvFill } from 'react-icons/ri';
import { IoStarSharp } from 'react-icons/io5';

import s from './sidebar.module.scss';

export default function Sidebar({ isOpen, toggleMenu }) {
  return (
    <>
      {isOpen && (
        <button className={s.overlay} onClick={toggleMenu}></button>
      )}
      <aside className={`${s.sidebar} ${isOpen ? s.open : ''}`} role="navigation" aria-label="Menu de navegação principal">
        <header className={s.userSection}>
          <button className={s.userMenu} aria-label="Menu do usuário">
            <img src={userPhoto} className={s.userPhoto} alt="Foto de perfil do usuário" />
            <span className={s.userName}>Usuário</span>
            <BiSolidDownArrow className={s.arrow} />
          </button>
        </header>
        <nav className={s.navigation} role="navigation" aria-label="Links de navegação">
          <ul className={s.navList} role="list">
            <li role="listitem">
              <Link
                to="/pesquisar"
                className={s.navItem}
                onClick={toggleMenu}
                aria-label="Pesquisar filmes e séries"
              >
                <BsSearch className={s.icon} aria-hidden="true" />
                <span className={s.text}>Pesquisar</span>
              </Link>
            </li>
            <li role="listitem">
              <Link to="/" className={s.navItem} onClick={toggleMenu}>
                <MdHomeFilled className={s.icon} aria-hidden="true" />
                <span className={s.text}>Início</span>
              </Link>
            </li>
            <li role="listitem">
              <Link to="/filmes" className={s.navItem} onClick={toggleMenu}>
                <PiFilmReelFill className={s.icon} aria-hidden="true" />
                <span className={s.text}>Filmes</span>
              </Link>
            </li>
            <li role="listitem">
              <Link to="/series" className={s.navItem} onClick={toggleMenu}>
                <RiTvFill className={s.icon} aria-hidden="true" />
                <span className={s.text}>Séries</span>
              </Link>
            </li>
            <li role="listitem">
              <Link to="/minha-lista" className={s.navItem} onClick={toggleMenu}>
                <IoStarSharp className={s.icon} aria-hidden="true" />
                <span className={s.text}>Minha Lista</span>
              </Link>
            </li>
            <li role="listitem">
              <Link to="/configuracoes" className={s.navItem} onClick={toggleMenu}>
                <MdSettings className={s.icon} aria-hidden="true" />
                <span className={s.text}>Configurações</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
