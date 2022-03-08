import { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router'
import { Table, Button, Row, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import { Container } from 'react-bootstrap'
import { allGroups, deleteGroup } from '../store/actions/group-actions'
import { listUsers } from '../store/actions/user-actions'

function GroupListScreen() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [searchGroup, setSearchGroup] = useState('')

  const allGroupList = useSelector(state => state.allGroupList)
  const { loading, error, groups } = allGroupList

  const userList = useSelector(state => state.userList)
  const { loading: loadingUserList, users } = userList


  const groupDelete = useSelector(state => state.groupDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = groupDelete


  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {

    if (!userInfo.isAdmin) {
      navigate('/login')
    }

    dispatch(allGroups())
    dispatch(listUsers())


  }, [dispatch, userInfo, navigate, successDelete])


  const deleteHandler = (id) => {

    if (window.confirm('Jesteś pewny, że chcesz usunąć tę grupę?')) {
      dispatch(deleteGroup(id))

    }
  }

  const createGroupHandler = () => {
    navigate('/admin/group/create')
  }

  return (
    <Container>
      <div>
        <Row className='align-items-center'>
          <Col>
            <h1>Grupy</h1>
          </Col>

          <Col className='text-right'>
            <Button className='my-3' onClick={createGroupHandler}>
              <i className='fas fa-plus'></i> Stwórz grupę
            </Button>
          </Col>
          <Form.Control
            type='text'
            placeholder='Wyszukaj grupę...'
            onChange={(e) => setSearchGroup(e.target.value)}
            style={{ margin: '20px 0' }}
          />
        </Row>

        {loadingDelete && <LoadingSpinner />}
        {errorDelete && <p>Błąd: {errorDelete}</p>}

        {loading || loadingUserList
          ? (<LoadingSpinner />)
          : error
            ? (<p>Błąd: {error}</p>)
            : (
              <div>
                <Table striped bordered hover responsive className='table-sm'>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>NAZWA</th>
                      <th>UŻYTKOWNICY</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {groups.filter(val => {
                      if (searchGroup == "") {
                        return val
                      } else if (val.group_name.toLowerCase().includes(searchGroup.toLowerCase())) {
                        return val
                      }
                    }).map(group => (
                      <tr key={group.ID}>
                        <td>{group.ID}</td>
                        <td>{group.group_name}</td>
                        <td>{users.map(user => {
                          const isExisted = user.groups.some(item => {
                            return item.ID === group.ID
                          })
                          if (isExisted) {
                            return <p key={user.user.id}>{user.user.username}</p>
                          }
                        })}</td>
                        <td>
                          <LinkContainer to={`/admin/group/${group.ID}/edit`}>
                            <Button variant='light' className='btn-sm'>
                              <i className='fas fa-edit'></i>
                            </Button>
                          </LinkContainer>

                          <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(group.ID)}>
                            <i className='fas fa-trash'></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
      </div>
    </Container>
  )
}

export default GroupListScreen