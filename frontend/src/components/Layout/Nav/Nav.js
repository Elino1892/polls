import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../../store/actions/user-actions';

import './Nav.scss'

const Nav = () => {

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false)
  let content = <i className="fas fa-bars"></i>;

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

  const classMenu = !open ? "menu" : "menu active"

  return (
    <>
      <nav>
        <ul className={classMenu}>
          <li className="logo"><Link to="/">Ankiety</Link></li>

          {/* Jak użytkownik nie jest zalogowany  */}

          {userInfo ?
            <>
              <p className="user-name">Użytkownik: {userInfo.name}</p>
              <li className="item"><Link to="/profile">Profil</Link></li>
              <button className="button" onClick={logoutHandler}>Wyloguj się</button>
            </>
            : (
              <>
                <li className="item"><Link to="/login">Logowanie</Link></li>
                <li className="item button"><Link to="/register">Rejestracja</Link></li>
              </>
            )
          }

          {/* {!open && <li className="item"><Link to="login/">Logowanie</Link></li>}
          {!open && <li className="item button"><Link to="register/">Rejestracja</Link></li>} */}

          {/*  Jak użytkownik zalogowany 
        <li class="item"><a href="#">Ankiety</a></li> 
        <li class="item button"><a href="#">Wyloguj</a></li> */}

          <li className="toggle" onClick={toggleMenuHandler}><Link to="#">{content}</Link></li>
        </ul>
      </nav>
    </>
  )
}

export default Nav;