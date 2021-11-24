import classes from './Footer.module.css'

const Footer = () => {
  return (
    <footer>
      <div className={classes["footer-container"]}>
        <div className={classes["logo-weii"]}>
          <img src="../../../images/logo-weii.png" alt="logo-weii" />
        </div>
        <div className={classes["authors-container"]}>
          <h3>Autorzy:</h3>
          <ul className={classes.authors}>
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


