import { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import LoadingSpinner from '../components/UI/LoadingSpinner'
// import Message from '../components/Message'
import { listUsers, deleteUser } from '../store/actions/user-actions'
import { Container } from 'react-bootstrap'
import Layout from '../components/Layout/Layout/Layout'
import { useNavigate } from 'react-router'
import { USER_DETAILS_RESET } from '../constants/userConstants'



const UserListScreen = () => {

  const [searchEmail, setSearchEmail] = useState('')
  // const [searchUsers, setSearchUsers] = useState([])

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userList = useSelector(state => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector(state => state.userDelete)
  const { success: successDelete } = userDelete


  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
      dispatch({ type: USER_DETAILS_RESET })
    } else {
      navigate('/login')

    }

  }, [dispatch, successDelete, userInfo, navigate])


  const deleteHandler = (id) => {

    if (window.confirm('Jesteś pewny, że chcesz usunąć tego użytkownika?')) {
      dispatch(deleteUser(id))
    }
  }

  const searchEmailHandler = (e) => {
    const { value } = e.target;

    setSearchEmail(value)

    console.log(searchEmail)

  }

  return (
    <Container>
      <div>
        <h1>Użytkownicy</h1>
        <Form.Control
          type='text'
          placeholder='Wyszukaj użytkownika...'
          // value={searchEmail}
          onChange={searchEmailHandler}
          style={{ margin: '20px 0' }}
        >

        </Form.Control>
        {loading
          ? (<LoadingSpinner />)
          : error
            ? (<p>Błąd: {error}</p>)
            : (
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>IMIĘ</th>
                    <th>EMAIL</th>
                    <th>ADMIN</th>
                    <th>GRUPA</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {users.filter(val => {
                    if (searchEmail == "") {
                      return val
                    } else if (val.user.email.toLowerCase().includes(searchEmail.toLowerCase())) {
                      return val
                    }
                  }).map(user => (
                    <tr key={user.user.id}>
                      <td>{user.user.id}</td>
                      <td>{user.user.name}</td>
                      <td>{user.user.email}</td>
                      <td>{user.user.isAdmin ? (
                        <i className='fas fa-check' style={{ color: 'green' }}></i>
                      ) : (
                        <i className='fas fa-check' style={{ color: 'red' }}></i>
                      )}</td>
                      <td>
                        {user.groups.map(group => (
                          <p key={group.ID}>{group.group_name !== 'Wszyscy' && group.group_name}</p>
                        )
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/admin/user/${user.user.id}/edit`}>
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>

                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user.user.id)}>
                          <i className='fas fa-trash'></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
      </div>
    </Container>
  )
}

export default UserListScreen