import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import FormContainer from '../components/UI/FormContainer'
import { getGroupDetails, updateGroup } from '../store/actions/group-actions'
import { GROUP_DETAILS_RESET } from "../constants/groupsConstants"


function GroupEditScreen() {

  const params = useParams();
  const { id: groupId } = params;

  const [name, setName] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const groupDetails = useSelector(state => state.groupDetails)
  const { error, loading, group } = groupDetails

  const groupUpdate = useSelector(state => state.groupUpdate)
  const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = groupUpdate


  useEffect(() => {

    if (successUpdate) {
      dispatch({ type: GROUP_DETAILS_RESET })
      navigate('/admin/grouplist')
    } else {
      if (!group.group_name || group.ID !== Number(groupId)) {
        dispatch(getGroupDetails(groupId))
      } else {
        setName(group.group_name)
      }
    }



  }, [dispatch, group, groupId, navigate, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateGroup({
      id: groupId,
      name,
    }))
  }


  return (
    <div>
      <Link to='/admin/grouplist'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Edycja grupy</h1>
        {loadingUpdate && <LoadingSpinner />}
        {errorUpdate && <p>Błąd: {errorUpdate}</p>}

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

              <Button type='submit' variant='primary'>
                Zaktualizuj
              </Button>

            </Form>
          )}

      </FormContainer >
    </div>
  )
}

export default GroupEditScreen