import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../../store/actions/user-actions';

import classes from './Nav.module.css'

const Nav = () => {

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false)
  let content = <i className={classes["fas fa-bars"]}></i>;

  const toggleMenuHandler = (e) => {
    // if ((e.target as Element).classList.contains('active')) {
    //   (e.target as Element).classList.remove('active')
    setOpen('');
    // } else {
    //   (e.target as Element).classList.add('active')
    //   content = <i className='fas fa-times'></i>;
    // }
  }

  const logoutHandler = () => {
    dispatch(logout())
  }

  const classMenu = !open ? classes.menu : `${classes.menu} ${classes.active}`;

  return (
    <>
      <nav>
        <ul className={classMenu}>
          <li className={classes.logo}><Link to="/">Ankiety</Link></li>

          {/* Jak użytkownik nie jest zalogowany  */}

          {userInfo ?
            <>
              <p className={classes["user-name"]}>Użytkownik: {userInfo.name}</p>
              <li className={classes.item}><Link to="/profile">Profil</Link></li>
              <button className={classes.button} onClick={logoutHandler}>Wyloguj się</button>
            </>
            : (
              <>
                <li className={classes.item}><Link to="/login">Logowanie</Link></li>
                <li className={`${classes.item} ${classes.button}`}><Link to="/register">Rejestracja</Link></li>
              </>
            )
          }

          {/* {!open && <li className="item"><Link to="login/">Logowanie</Link></li>}
          {!open && <li className="item button"><Link to="register/">Rejestracja</Link></li>} */}

          {/*  Jak użytkownik zalogowany 
        <li class="item"><a href="#">Ankiety</a></li> 
        <li class="item button"><a href="#">Wyloguj</a></li> */}

          <li className={classes.toggle} onClick={toggleMenuHandler}><Link to="#">{content}</Link></li>
        </ul>
      </nav>
    </>
  )
}

export default Nav;