import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import FormContainer from '../components/UI/FormContainer'
import { createGroup } from '../store/actions/group-actions'
import { GROUP_CREATE_RESET } from "../constants/groupsConstants"
import { listUsers } from '../store/actions/user-actions'


function GroupCreateScreen() {

  const [searchUser, setSearchUser] = useState('')
  const [name, setName] = useState('')
  const [usersGroup, setUsersGroup] = useState([])

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const userList = useSelector(state => state.userList)
  const { loading, error, users } = userList

  const groupCreate = useSelector(state => state.groupCreate)
  const { loading: loadingCreate, error: errorCreate, success: successCreate } = groupCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(listUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch({ type: GROUP_CREATE_RESET })
    if (userInfo && userInfo.isAdmin) {
    } else {
      navigate('/login')
    }

    if (typeof users !== "undefined") {
      if (users.length) {
        setUsersGroup(new Array(users.length).fill(false))
      }
    }

    if (successCreate) {
      navigate('/admin/grouplist')
    }



  }, [dispatch, userInfo, successCreate, navigate, JSON.stringify(users)])

  const submitHandler = (e) => {
    e.preventDefault()
    const users = addUsersToGroup()
    if (name) {
      dispatch(createGroup({
        name,
        users
      }))
    }
  }



  const handleOnChange = (position) => {
    const updatedUsersGroup = usersGroup.map((item, index) =>
      index === position ? !item : item
    );

    setUsersGroup(updatedUsersGroup)
  }

  const addUsersToGroup = () => {
    const tempUsersGroup = [...usersGroup];
    const tempUsers = [...users];

    const array = tempUsersGroup.map((item, index) => item &&
      tempUsers[index].user
    )
    return array.filter(item => item)
  }


  return (
    <div>
      <Link to='/admin/grouplist'>
        Powrót
      </Link>

      <FormContainer>
        <h1>Tworzenie grupy</h1>
        {loadingCreate && <LoadingSpinner />}
        {errorCreate && <p>Błąd: {errorCreate}</p>}

        {loading ? <LoadingSpinner /> : error ? <p>Błąd: {error}</p>
          : (
            <Form onSubmit={submitHandler}>

              <Form.Group controlId='name'>
                <Form.Label>Nazwa</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Wpisz nazwę'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                >
                </Form.Control>
              </Form.Group>

              <Form.Label style={{ marginTop: '10px' }}>Użytkownicy</Form.Label>
              <Form.Control
                type='text'
                placeholder='Wyszukaj użytkownika...'
                onChange={(e) => setSearchUser(e.target.value)}
                style={{ marginBottom: '10px' }}
              />
              <Form.Group controlId='users'>
                {
                  users.filter(val => {
                    if (searchUser == "") {
                      return val
                    } else if (val.user.email.toLowerCase().includes(searchUser.toLowerCase())) {
                      return val
                    }
                  }).map((user, index) =>
                    <Form.Check
                      key={user.user.id}
                      id={user.user.id}
                      type='checkbox'
                      value={user.user.email}
                      label={user.user.email}
                      checked={usersGroup[index]}
                      onChange={(e) => handleOnChange(index, e)}
                    >
                    </Form.Check>)

                }
              </Form.Group>

              <Button type='submit' variant='primary'>
                Stwórz grupę
              </Button>

            </Form>
          )}

      </FormContainer >
    </div>
  )
}

export default GroupCreateScreen