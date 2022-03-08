import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../../store/actions/user-actions';

import classes from './Navigation.module.css'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
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

  useEffect(() => {
    if (userGroups) {
      const employeeArray = userGroups.some(group => group.groupName === 'Pracownik')
      if (employeeArray) {
        setIsEmployee(true)
      }
    }
  }, [JSON.stringify(userGroups)])




  return (
    <Navbar className={classes['color-nav']} variant="light" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>Ankiety</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{ justifyContent: 'flex-end', marginRight: '100px' }}>
          <Nav className="ml-auto">
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
      </Container>
    </Navbar>
  )
}

export default Navigation;