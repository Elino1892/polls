import { useRef, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import PollOptionAnswer from "./PollOptionAnswer";
import { getQuestionsAnswersCreatePoll } from "../../../store/actions/answer-actions";
import { ANSWER_QUESTION_CREATE_POLL_RESET } from "../../../constants/answerConstants";

import classes from "./PollQuestionAnswers.module.css"

const PollQuestionAnswers = ({ id: questionAnswerID, onRemoveQuestionWithAnswers }) => {

  const dispatch = useDispatch();

  const [isSaved, setIsSaved] = useState(false)

  const answersCreatePoll = useSelector(state => state.answersCreatePoll)
  const { answersQuestion } = answersCreatePoll

  const allQuestionsAnswersCreatePoll = useSelector(state => state.allQuestionsAnswersCreatePoll);
  const { questionsAnswers } = allQuestionsAnswersCreatePoll;

  const [typeAnswer, setTypeAnswer] = useState({
    "isSingleChoice": true,
    "isMultiChoice": false,
    "isOpen": false,
    "isDateChoice": false
  });
  const [selectedTypeAnswer, setSelectedTypeAnswer] = useState('');
  const [answers, setAnswers] = useState([]);

  const questionInputRef = useRef();


  const selectTypeAnswerHandler = (e) => {

    const { value } = e.target

    setSelectedTypeAnswer(value)

    let typeAnswerTemp = {}

    switch (value) {
      case "one": {
        typeAnswerTemp = {
          "isSingleChoice": true,
          "isMultiChoice": false,
          "isOpen": false,
          "isDateChoice": false
        }
        break;
      }
      case "multi": {
        typeAnswerTemp = {
          "isSingleChoice": false,
          "isMultiChoice": true,
          "isOpen": false,
          "isDateChoice": false
        }
        break;
      }
      case "open": {
        typeAnswerTemp = {
          "isSingleChoice": false,
          "isMultiChoice": false,
          "isOpen": true,
          "isDateChoice": false
        }
        dispatch({ type: ANSWER_QUESTION_CREATE_POLL_RESET })
        break;
      }
      case "date": {
        typeAnswerTemp = {
          "isSingleChoice": false,
          "isMultiChoice": false,
          "isOpen": false,
          "isDateChoice": true
        }
        dispatch({ type: ANSWER_QUESTION_CREATE_POLL_RESET })
        break;
      }
      default:
        typeAnswerTemp = {
          "isSingleChoice": false,
          "isMultiChoice": false,
          "isOpen": false,
          "isDateChoice": false
        }
    }

    setTypeAnswer(typeAnswerTemp);
  }

  const removeOptionAnswerHandler = useCallback((id) => {

    const answersTemp = [...answers]
    const tempArray = answersTemp.filter(item => item.id !== id)
    setAnswers(tempArray)

  }, [])

  const defaultAmountOfAnswers = useCallback(() => {
    const answersArray = [];
    if (typeAnswer.isSingleChoice || typeAnswer.isMultiChoice) {
      for (let i = 0; i < answers.length; i++) {
        answersArray.push(<PollOptionAnswer onRemoveOptionAnswer={removeOptionAnswerHandler} isSaved={isSaved} key={answersArray.length} id={answersArray.length} typeAnswer={typeAnswer} />)
      }
    } else {
      answersArray.push(<PollOptionAnswer onRemoveOptionAnswer={removeOptionAnswerHandler} isSaved={isSaved} key={answersArray.length} id={answersArray.length} typeAnswer={typeAnswer} />)
    }
    setAnswers(answersArray)
  }, [typeAnswer, isSaved, removeOptionAnswerHandler, answers.length])

  useEffect(() => {
    defaultAmountOfAnswers();
  }, [defaultAmountOfAnswers])





  const addOptionToAnswerHandler = useCallback(() => {
    const answersArray = [...answers]
    answersArray.push(<PollOptionAnswer onRemoveOptionAnswer={removeOptionAnswerHandler} isSaved={isSaved} key={answersArray.length} id={answersArray.length} typeAnswer={typeAnswer} />)
    setAnswers(answersArray)
  }, [isSaved, answers, typeAnswer, removeOptionAnswerHandler])



  const savePollHandler = () => {
    const { value: questionValue } = questionInputRef.current;

    if (!questionValue || !answers.length || (!answersQuestion.length && (typeAnswer.isSingleChoice || typeAnswer.isMultiChoice))) {
      return
    }

    let isRepeated = false;

    questionsAnswers.forEach(question => {
      if (question.id === questionAnswerID) {
        isRepeated = true;
      }
    })

    setIsSaved(true);

    let questionAndAnswers = {};

    if (answersQuestion.length) {
      questionAndAnswers = {
        "id": questionAnswerID,
        "questionText": questionValue,
        "type": typeAnswer,
        "answers": answersQuestion,
      }
    } else {
      questionAndAnswers = {
        "id": questionAnswerID,
        "questionText": questionValue,
        "type": typeAnswer,
      }
    }


    dispatch(getQuestionsAnswersCreatePoll(questionAndAnswers, questionsAnswers, isRepeated))


  }

  const editPollHandler = () => {
    setIsSaved(false)
  }

  return (
    <>
      <div className={classes["poll-question"]}>
        <div className={classes["poll-question-content"]}>
          {!isSaved ? <Form.Control
            required
            type="text"
            placeholder="Pytanie"
            ref={questionInputRef}
          /> :
            <Form.Control
              disabled
              type="text"
              placeholder="Pytanie"
              ref={questionInputRef}
            />
          }
          <div className={classes["question-content"]}>
            <div className={classes.answers}>
              {answers}
            </div>
          </div>
        </div>
        {!isSaved ? <div className={classes["question-menu"]}>
          {typeAnswer.isSingleChoice || typeAnswer.isMultiChoice ?
            <Button variant="secondary" type="button" onClick={addOptionToAnswerHandler}>Dodaj opcję</Button>
            : null}
          <Form.Select style={{ width: 'auto' }} onChange={selectTypeAnswerHandler} value={selectedTypeAnswer} name="type-answer" id="type-answer">
            <option value="one">Jednokrotny wybór</option>
            <option value="multi">Wielokrotny wybór</option>
            <option value="open">Otwarta odpowiedź</option>
            <option value="date">Data</option>
          </Form.Select>

          <Button variant="success" type="button" onClick={savePollHandler}>Zapisz</Button>
          <Button variant="danger" type="button" onClick={() => onRemoveQuestionWithAnswers(questionAnswerID)}>Usuń pytanie</Button>
        </div> :
          <div className={classes["question-menu"]}>
            <Button variant="info" type="button" onClick={editPollHandler}>Edytuj</Button>
            <Button variant="danger" type="button" onClick={() => onRemoveQuestionWithAnswers(questionAnswerID)}>Usuń pytanie</Button>
          </div>
        }
      </div >
    </>
  )
}

export default PollQuestionAnswers;