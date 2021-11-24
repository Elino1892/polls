import './Footer.scss'

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="logo-weii">
          <img src="../../../images/logo-weii.png" alt="logo-weii" />
        </div>
        <div className="authors-container">
          <h3>Autorzy:</h3>
          <ul className="authors">
            <li>Kondzierski Przemysław</li>
            <li>Kopczacki Kacper</li>
            <li>Marciniak Marcin</li>
            <li>Maziarz Jakub</li>
            <li>Mierzwiński Paweł</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer;


