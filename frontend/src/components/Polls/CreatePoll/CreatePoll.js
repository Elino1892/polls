import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router';
import { ANSWER_QUESTION_CREATE_POLL_RESET } from "../../../constants/answerConstants";
import { sentNewPoll } from "../../../store/actions/poll-actions";

import PollDescription from "./PollDescritpion";
import Button from "../../UI/Button";

import classes from './CreatePoll.module.css'
import PollQuestionAnswers from "./PollQuestionAnswers";
import { Form, Table } from "react-bootstrap";



const CreatePoll = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const pollDescriptionCreatePoll = useSelector(state => state.pollDescriptionCreatePoll);
  const { pollDescription } = pollDescriptionCreatePoll

  const allQuestionsAnswersCreatePoll = useSelector(state => state.allQuestionsAnswersCreatePoll);
  const { questionsAnswers } = allQuestionsAnswersCreatePoll

  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);

  const removeQuestionWithAnswersHandler = (id) => {
    const questionsAndAnswersTemp = [...questionsAndAnswers];
    console.log(questionsAndAnswers)
    console.log(id)
    const tempArray = questionsAndAnswersTemp.filter(item => item.id !== id)
    setQuestionsAndAnswers(tempArray)
    dispatch({ type: ANSWER_QUESTION_CREATE_POLL_RESET })
  }

  const addQuestionWithAnswers = () => {
    const questionsAndAnswersTemp = [...questionsAndAnswers];
    // const randomNumber = Math.floor(Math.random() * 1000000)
    questionsAndAnswersTemp.push(<PollQuestionAnswers key={questionsAndAnswersTemp.length} id={questionsAndAnswersTemp.length} onRemoveQuestionWithAnswers={removeQuestionWithAnswersHandler} />)

    setQuestionsAndAnswers(questionsAndAnswersTemp)
    // console.log(questionsAndAnswers)
    dispatch({ type: ANSWER_QUESTION_CREATE_POLL_RESET })
  }

  const addPollHandler = (e) => {
    e.preventDefault();
    if (pollDescription && questionsAndAnswers.length) {
      dispatch(sentNewPoll(pollDescription, questionsAnswers))
      navigate('/polls/created-poll');
    }
  }


  return (
    <>
      <div className={classes["sub-nav"]}>
        <h2>Tworzenie ankiety</h2>
      </div>
      <Form onSubmit={addPollHandler} className={classes["poll-container"]}>

        <PollDescription />
        {questionsAndAnswers.length !== 0 && questionsAndAnswers}
        <Table style={{ marginTop: "20px" }} bordered responsive className='table-sm'>
          {<thead>
          </thead>}
          <tbody>
            <tr>
              <td>
                <Button type="button" onClick={addQuestionWithAnswers}>Dodaj pytanię</Button>
              </td>
              <td>
                <Button type="submit">Opublikuj</Button>
              </td>
            </tr>
          </tbody>
        </Table>


      </Form>
    </>
  )
}

export default CreatePoll;