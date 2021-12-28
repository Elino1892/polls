import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../../store/actions/user-actions';

import classes from './Navigation.module.css'
import { Navbar, Nav, Container, Row, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


const Navigation = () => {


  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userGroupList = useSelector(state => state.userGroupList);
  const { userGroups } = userGroupList;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEmployee, setIsEmployee] = useState(false)

  const logoutHandler = () => {
    dispatch(logout())
    navigate('/');
  }

  // let isEmployee = false;
  useEffect(() => {
    if (userGroups) {
      const employeeArray = userGroups.some(group => group.groupName === 'Pracownik')
      if (employeeArray) {
        console.log('eloo')
        setIsEmployee(true)
      }
    }
  }, [JSON.stringify(userGroups)])




  return (
    <Navbar className={classes['color-nav']} variant="light" expand="lg" collapseOnSelect>
      <Container>
        {/* <ul className={classMenu}> */}
        {/* <li className={classes.logo}><Link to="/">Ankiety</Link></li> */}
        <LinkContainer to='/'>
          <Navbar.Brand>Ankiety</Navbar.Brand>
        </LinkContainer>
        {/* Jak użytkownik nie jest zalogowany  */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{ justifyContent: 'flex-end', marginRight: '100px' }}>
          <Nav className="ml-auto">

            {/* <LinkContainer to='/cart'>
                <Nav.Link ><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
              </LinkContainer> */}

            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profil</NavDropdown.Item>
                </LinkContainer>
                {!userInfo.isAdmin && <LinkContainer to='/polls'>
                  <NavDropdown.Item>Moje ankiety</NavDropdown.Item>
                </LinkContainer>}
                {(isEmployee && !userInfo.isAdmin) && <LinkContainer to='/polls/create-poll'>
                  <NavDropdown.Item>Tworzenie ankiety</NavDropdown.Item>
                </LinkContainer>}

                <NavDropdown.Item onClick={logoutHandler}>Wyloguj się</NavDropdown.Item>

              </NavDropdown>
            ) : (
              <>
                <LinkContainer to='/login'>
                  <Nav.Link><i className="fas fa-user"></i>Logowanie</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/register'>
                  <Nav.Link><i className="fas fa-user"></i>Rejestracja</Nav.Link>
                </LinkContainer>
              </>

            )}


            {userInfo && userInfo.isAdmin && (
              <NavDropdown title='Admin' id='adminmenue'>
                <LinkContainer to='/admin/userlist'>
                  <NavDropdown.Item>Użytkownicy</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to='/admin/grouplist'>
                  <NavDropdown.Item>Grupy</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to='/admin/polllist'>
                  <NavDropdown.Item>Ankiety</NavDropdown.Item>
                </LinkContainer>

              </NavDropdown>
            )}


          </Nav>
        </Navbar.Collapse>





        {/* {userInfo ?
              <>
                <p className={classes["user-name"]}>Użytkownik: {userInfo.name}</p>
                <li className={classes.item}><Link to="/polls">Moje ankiety</Link></li>
                {(isEmployee.length !== 0 || userInfo.isAdmin) && <li className={classes.item}><Link to="/polls/create-poll">Tworzenie ankiety</Link></li>}
                {userInfo.isAdmin && <li className={classes.item}><Link to="/admin/userlist">Użytkownicy</Link></li>}
                {userInfo.isAdmin && <li className={classes.item}><Link to="/admin/grouplist">Grupy</Link></li>}
                {userInfo.isAdmin && <li className={classes.item}><Link to="/admin/polllist">Ankiety</Link></li>}
                <li className={classes.item}><Link to="/profile">Profil</Link></li>

                <button className={classes.button} onClick={logoutHandler}>Wyloguj się</button>
              </>
              : (
                <>
                  <li className={classes.item}><Link to="/login">Logowanie</Link></li>
                  <li className={`${classes.item} ${classes.button}`}><Link to="/register">Rejestracja</Link></li>
                </>
              )
            } */}







        {/* {!open && <li className="item"><Link to="login/">Logowanie</Link></li>}
          {!open && <li className="item button"><Link to="register/">Rejestracja</Link></li>} */}

        {/*  Jak użytkownik zalogowany 
        <li class="item"><a href="#">Ankiety</a></li> 
        <li class="item button"><a href="#">Wyloguj</a></li> */}

        {/* <li className={classes.toggle} onClick={toggleMenuHandler}><Link to="#">{content}</Link></li> */}
        {/* </ul> */}
      </Container>
    </Navbar>
  )
}

export default Navigation;