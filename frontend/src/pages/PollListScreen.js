import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Table, Button, Row, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import { Container } from 'react-bootstrap'
import Layout from '../components/Layout/Layout/Layout'
import { listPolls, deletePoll, downloadReport } from '../store/actions/poll-actions'
// import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

function PollListScreen() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [searchPoll, setSearchPoll] = useState('')
  const [searchUser, setSearchUser] = useState('')

  const pollList = useSelector(state => state.pollList);
  const { error, polls, loading } = pollList;

  // const allGroupList = useSelector(state => state.allGroupList)
  // const { loading, error, groups } = allGroupList

  // const userList = useSelector(state => state.userList)
  // const { loading: loadingUserList, error: errorUserList, users } = userList


  // const groupDelete = useSelector(state => state.groupDelete)
  // const { loading: loadingDelete, error: errorDelete, success: successDelete } = groupDelete

  // const productCreate = useSelector(state => state.productCreate)
  // const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate


  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const pollDelete = useSelector(state => state.pollDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = pollDelete

  // let keyword = history.location.search
  useEffect(() => {
    // dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo.isAdmin) {
      navigate('/login')
    }

    // if (successCreate) {
    // navigate(`/admin/polllist`)
    // } else {
    dispatch(listPolls())
    // dispatch(listUsers())
    // }

  }, [dispatch, userInfo, navigate, successDelete])


  const deleteHandler = (id) => {

    if (window.confirm('Jesteś pewny, że chcesz usunąć tą ankietę ?')) {
      dispatch(deletePoll(id))

    }
  }

  const createPollHandler = () => {
    // dispatch(createGroup())
    navigate('/polls/create-poll')
  }

  const displayAnswers = (question) => {

    switch (true) {
      case question.question.is_single_choice: {
        return (
          <tr >
            <td style={{ height: '200px', padding: '0' }}><Table style={{ margin: '0', height: '100%' }} striped bordered hover>
              <tbody>
                {question.answers.map(answer => (
                  <tr
                    key={answer.ID}>
                    <td style={answer.is_marked ? { color: 'green' } : { color: 'red' }}>{answer.answer}</td>
                  </tr>
                ))}
              </tbody>
            </Table></td>
          </tr >)

        // <td style={{ height: '160px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{answer.answer}</td>


        // console.log(answers)
        // return answers
      }
      case question.question.is_multi_choice: {
        return (
          <tr >
            <td style={{ height: '200px', padding: '0' }}><Table style={{ margin: '0', height: '100%' }} striped bordered hover>
              <tbody>
                {question.answers.map(answer => (
                  <tr
                    key={answer.ID}>
                    <td style={answer.is_marked ? { color: 'green' } : { color: 'red' }}>{answer.answer}</td>
                  </tr>
                ))}
              </tbody>
            </Table></td>
          </tr >)
      };
      case question.question.is_open: {
        return (
          <tr >
            {question.answers.map(answer => (
              <td style={{ height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} key={answer.ID}>{answer.open_answer}</td>
            ))}
          </tr >)
      }
      case question.question.is_date_choice: {
        return (
          <tr >
            {question.answers.map(answer => (
              <td style={{ height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} key={answer.ID}>{answer.date_answer}</td>
            ))}
          </tr >
        )
      }
      default: {
        return question.question
      }
    }
  }

  return (
    <Container>
      <div>
        <Row className='align-items-center'>
          <Col>
            <h1>Ankiety</h1>
          </Col>

          <Col className='text-right' style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button style={{ marginRight: '10px' }} onClick={createPollHandler}>
              <i className='fas fa-plus'></i>
              Stwórz ankiętę
            </Button>

          </Col>
          {/* <Col>
            
          </Col> */}
          <Form.Control
            type='text'
            placeholder='Wyszukaj ankietę...'
            // value={searchEmail}
            onChange={(e) => setSearchPoll(e.target.value)}
            style={{ margin: '20px 0' }}
          />
          <Form.Control
            type='text'
            placeholder='Wyszukaj użytkownika...'
            // value={searchEmail}
            onChange={(e) => setSearchUser(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
        </Row>

        {loadingDelete && <LoadingSpinner />}
        {errorDelete && <p>Błąd: {errorDelete}</p>}



        {loading
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
                      <th>OPIS</th>
                      <th>TERMIN</th>
                      <th>ZAKOŃCZONY</th>
                      <th>GRUPY</th>
                      <th>UŻYTKOWNIK</th>
                      <th>PYTANIA</th>
                      <th>ODPOWIEDZI</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {polls.filter(val => {
                      if (searchPoll == "" && searchUser == "") {
                        return val
                      } else if (val.name.toLowerCase().includes(searchPoll.toLowerCase()) && val.user.email.toLowerCase().includes(searchUser.toLowerCase())) {
                        return val

                      }
                    }).map(poll => (
                      <>
                        <tr key={poll.id}>
                          <td>{poll.id}</td>
                          <td>{poll.name}</td>
                          <td>{poll.description}</td>
                          <td>
                            <p>{poll.deadline.slice(0, 10)}</p>
                            <p>{poll.deadline.slice(11, 19)}</p>
                          </td>
                          <td>{poll.isFinished ? (
                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                          ) : (
                            <i className='fas fa-check' style={{ color: 'red' }}></i>
                          )}</td>
                          <td>{poll.groups.map(group => (
                            <p key={group.ID}>{group.group_name}</p>
                          ))}</td>
                          <td>{poll.user.email}</td>
                          <td style={{ padding: '0' }}>
                            <Table style={{ margin: '0' }} striped bordered hover>
                              <tbody>
                                {poll.questions.map(question => (
                                  <tr
                                    key={question.question.ID}>
                                    <td style={{ height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{question.question.question}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </td>
                          <td style={{ padding: '0' }}>
                            {!poll.isFinished ? <p style={{ padding: '5px' }}>Ten użytkownik nie wypełnił jeszcze ankiety</p> :
                              <Table style={{ margin: '0' }} striped bordered hover>
                                <tbody>
                                  {poll.questions.map(question =>
                                    displayAnswers(question)
                                  )
                                  }
                                </tbody>
                              </Table>
                            }
                          </td>
                          <td>
                            <Button variant='dark' className='btn-sm' onClick={() => dispatch(downloadReport(poll.name, true))}>
                              <i className='fas fa-file'></i>
                            </Button>
                            {/* <Button onClick={() => console.log()}>Raport</Button> */}
                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(poll.id)}>
                              <i className='fas fa-trash'></i>
                            </Button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </Table>
                {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
              </div>
            )}
      </div>
    </Container>
  )
}

export default PollListScreen