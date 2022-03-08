import classes from './Footer.module.css'
import logoWeii from '../../../images/logo-weii.png'


const Footer = () => {
  return (
    <footer>
      <div className={classes["footer-container"]}>
        <div className={classes["logo-weii"]}>
          <img src={logoWeii} alt="logo-weii" />
        </div>
        <div className={classes["authors-container"]}>
          <h3>Autor:</h3>
          <ul className={classes.authors}>
            <li>Marciniak Marcin</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer;


