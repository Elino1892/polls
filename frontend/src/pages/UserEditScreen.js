import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import Layout from '../components/Layout/Layout/Layout'
import { getUserDetails, updateUser } from '../store/actions/user-actions'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import FormContainer from '../components/UI/FormContainer'
import { allGroups } from '../store/actions/group-actions'
import { useCallback } from 'react'

function UserEditScreen() {
  const params = useParams();
  const { id: userId } = params;

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [userGroups, setUserGroups] = useState([])

  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const { error, loading, user } = userDetails

  const allGroupList = useSelector(state => state.allGroupList)
  const { loading: loadingAllGroupList, groups } = allGroupList

  const userUpdate = useSelector(state => state.userUpdate)
  const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate

  const checkUserGroupBelong = useCallback((groupsTempp) => {
    const userGroupsTemp = [...groupsTempp]
    const groupsTemp = [...groups]

    console.log(groupsTemp)
    console.log(userGroupsTemp)
    let isEmpty = false;
    if (!userGroupsTemp.length) {
      isEmpty = true
    }
    // console.log(groups)
    // debugger
    const array = []
    groupsTemp.forEach(group => {
      if (isEmpty && group.group_name !== 'Wszyscy') {
        const userGroupBelong = {
          'ID': group.ID,
          'group_name': group.group_name,
          'isBelong': false
        }
        array.push(userGroupBelong)
      }
      userGroupsTemp.forEach(userGroup => {
        if (group.group_name !== 'Wszyscy') {
          if (group.ID === userGroup.ID) {
            const userGroupBelong = {
              'ID': userGroup.ID,
              'group_name': userGroup.group_name,
              'isBelong': true
            }

            array.push(userGroupBelong)
          } else {
            const userGroupBelong = {
              'ID': group.ID,
              'group_name': group.group_name,
              'isBelong': false
            }
            array.push(userGroupBelong)
          }
        }
      })
    })

    for (let i = 0; i < array.length; i++) {
      for (let j = i + 1; j < array.length; j++) {
        if (array[i].ID === array[j].ID) {
          if (array[i].isBelong) {
            array.splice(j, 1)
          } else {
            array.splice(i, 1)
          }
        }
      }
    }

    console.log(array)
    setUserGroups(array)
  }, [JSON.stringify(groups)])



  useEffect(() => {
    dispatch(allGroups())
  }, [dispatch])

  useEffect(() => {

    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      navigate('/admin/userlist')
    } else {
      if (!user.userInfo || user.userInfo.id !== Number(userId)) {
        dispatch(getUserDetails(userId))
      } else {

        setName(user.userInfo.name)
        setEmail(user.userInfo.email)
        setIsAdmin(user.userInfo.isAdmin)
        const groupsTempp = user.groups.filter(group => group.group_name !== 'Wszyscy')
        setUserGroups(groupsTempp)
        if (typeof groups !== "undefined") {
          console.log('elooo')
          if (groups.length) {
            console.log('elooo222')
            checkUserGroupBelong(groupsTempp)
          }
        }
      }
    }
  }, [user, userId, successUpdate, dispatch, navigate, JSON.stringify(groups)])

  const setNewUserGroups = (e) => {
    const { checked, id } = e.target;

    const userGroupsTemp = [...userGroups]

    const index = userGroupsTemp.findIndex(group => group.ID === parseInt(id, 10))

    userGroupsTemp[index].isBelong = checked
    setUserGroups(userGroupsTemp)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ id: user.userInfo.id, name, userGroups, email, isAdmin }))
  }

  return (
    <div>
      <Link to='/admin/userlist'>
        Powrót
      </Link>

      <FormContainer>
        <h1>Edycja użytkownika</h1>
        {loadingUpdate && <LoadingSpinner />}
        {/* {loadingAllGroupList && <LoadingSpinner />} */}
        {errorUpdate && <p>Błąd: {errorUpdate}</p>}

        {loading && loadingAllGroupList ? <LoadingSpinner /> : error ? <p>Błąd: {error}</p>
          : (
            <Form onSubmit={submitHandler}>

              <Form.Group controlId='name'>
                <Form.Label>Imię</Form.Label>
                <Form.Control

                  type='name'
                  placeholder='Wpisz imię'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                >
                </Form.Control>
              </Form.Group>

              <Form.Group controlId='email'>
                <Form.Label>Adres email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Wpisz email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                >
                </Form.Control>
              </Form.Group>

              <Form.Group controlId='isadmin'>
                <Form.Check
                  type='checkbox'
                  label='Admin'
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                >
                </Form.Check>
              </Form.Group>

              <Form.Label>Wszystkie grupy</Form.Label>
              <Form.Group controlId='groups'>
                {userGroups.length ?

                  userGroups.map(group =>
                    <Form.Check
                      key={group.ID}
                      id={group.ID}
                      type='checkbox'
                      value={group.group_name}
                      label={group.group_name}
                      checked={group.isBelong}
                      onChange={(e) => setNewUserGroups(e)}
                    >
                    </Form.Check>) :
                  <LoadingSpinner />
                }
              </Form.Group>

              <Button type='submit' variant='primary'>
                Zaktualizuj
              </Button>

            </Form>
          )}

      </FormContainer>
    </div>
  )
}

export default UserEditScreen