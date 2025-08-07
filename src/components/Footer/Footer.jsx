import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import s from "./footer.module.scss"

export default function Footer() {
  return (
    <footer className={s.footer}>
      <section className={s.footerContent}>
        <nav className={s.footerLinks} aria-label="Redes sociais">
          <a href="#" aria-label="YouTube"><FaYoutube /></a>
          <a href="#" aria-label="X (Twitter)"><FaXTwitter /></a>
          <a href="#" aria-label="Facebook"><FaFacebook /></a>
          <a href="#" aria-label="Instagram"><FaInstagram /></a>
          <a href="#" aria-label="TikTok"><FaTiktok /></a>
        </nav>

        <nav className={s.footerLinks} aria-label="Links do rodapé">
          <a href="#">Acessibilidade</a>
          <a href="#">Termos de Uso</a>
          <a href="#">Política de Privacidade</a>
          <a href="#">Política de Cookies</a>
          <a href="#">Informações de Anúncios</a>
          <a href="#">Ajuda</a>
        </nav>
      </section>

      <section className={s.footerCopyright}>
        <p>© 2025 <strong>StreamFlix, Inc.</strong> Todos os direitos reservados.</p>
      </section>
    </footer>
  )
}