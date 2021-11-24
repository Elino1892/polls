import classes from './Header.module.css'

const Header = () => {
  return (
    <header>
      <div className={classes["header-container"]}>
        <div className={classes["header-content"]}>
          <h1>Tworzenie własnych ankiet z możliwością generowania raportów</h1>
        </div>
      </div>
    </header>
  )
}

export default Header;