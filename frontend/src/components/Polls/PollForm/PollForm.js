import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { FloatingLabel, Form } from "react-bootstrap";

import { sentAnswersFromUser } from "../../../store/actions/answer-actions";

import Button from "../../UI/Button";
import classes from "./PollForm.module.css"


const PollForm = ({ poll }) => {

  const navigate = useNavigate();
  const { poll_info: pollInfo, questions_answers: questionsAndAnswers } = poll;

  const params = useParams();
  const { pollId } = params;
  const testArray = []

  const setArrayToAnswers = () => {
    const array = [];
    questionsAndAnswers.forEach(question => {
      if (question.type.is_multi_choice) {
        const tempArray = [];
        question.answers.forEach(item => testArray.push(item))
        array.push(tempArray);
      } else {
        array.push({})
      }
    })
    return array;
  }

  const dispatch = useDispatch();


  const checkAnswersIsEmpty = () => {
    let isEmpty = false;
    tempAnswers.forEach(answer => {
      if (Array.isArray(answer) && answer.length === 0) {
        isEmpty = true;
      } else if (Object.keys(answer).length === 0) {
        isEmpty = true;
      }
    })
    return isEmpty;
  }

  const removeEmptyValue = () => {
    tempAnswers.forEach(item => {
      if (Array.isArray(item)) {
        const tmpArray = [];
        item.forEach(answer => {
          tmpArray.push(answer)
        })
        item.length = 0;
        tmpArray.forEach(answer => {
          item.push(answer)
        })
        item = [...tmpArray];
      }

    });
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const isEmptyForm = checkAnswersIsEmpty();
    removeEmptyValue()
    if (isEmptyForm) {
      throw new Error('Error with form!')
    } else {
      dispatch(sentAnswersFromUser(tempAnswers, pollId));
      navigate(`/polls/${pollId}/finished-poll`);
    }
  }

  const [tempAnswers, setTempAnswers] = useState(setArrayToAnswers())

  const changeInputValueHandler = (e, index) => {

    const tempArray = [...tempAnswers];

    if (e.target.type === 'radio') {

      const { value, id } = e.target;

      const answer = {
        type: 'radio',
        value,
        id
      }

      tempArray[index] = answer;
    } else if (e.target.type === 'checkbox') {
      const isChecked = e.target.checked;


      const answer = {
        type: 'checkbox',
        id: e.target.id,
        value: e.target.value,
      }


      if (isChecked) {
        testArray.forEach((item, indexItem) => {
          if (item.id === +answer.id) {
            tempArray[index][indexItem] = answer
          }
        })
      } else {
        testArray.forEach((item, indexItem) => {
          if (item.id === +answer.id) {
            tempArray[index] = tempArray[index].filter(item => item.id !== answer.id)
            tempArray[index] = tempArray[index].filter(item => item)
          }
        })
      }
    } else if (e.target.type === 'textarea') {
      const { value, id } = e.target;

      const answer = {
        type: 'textarea',
        value,
        id
      }

      tempArray[index] = answer;
    } else if (e.target.type === 'date') {
      const { value, id } = e.target;

      const answer = {
        type: 'date',
        value,
        id
      }

      tempArray[index] = answer;
    }
    setTempAnswers(tempArray);


  }

  const addAnswer = (questionType, answers, index) => {
    switch (questionType) {
      case 'is_single_choice': {
        if (!answers.length) {
          return;
        }
        const content = answers.map(answer =>
          <div key={answer.id} className="mb-3">
            <Form.Check
              type='radio'
              id={answer.id}
              required
              value={answer.answer_text}
              label={answer.answer_text}
              name={'poll-option'}
            />
          </div>
        )

        return content;
      }
      case 'is_multi_choice': {
        if (!answers.length) {
          return;
        }
        const content = answers.map(answer =>
          <div key={answer.id} className="mb-3">
            <Form.Check
              type='checkbox'
              id={answer.id}
              value={answer.answer_text}
              label={answer.answer_text}
            />
          </div>
        )

        return content;
      }
      case 'is_open': {
        const content = <FloatingLabel
          controlId="floatingTextarea2"

          key={answers[0].id}
        >
          <Form.Control
            required
            id={answers[0].id}
            name="answer-open"
            as="textarea"
            placeholder="Wpisz swoją odpowiedź"
            style={{ height: '100px' }}
          />
        </FloatingLabel>
        return content;
      }
      case 'is_date_choice': {
        const content =
          <Form.Control
            type="date"
            key={answers[0].id}
            required
            id={answers[0].id}
          />

        return content
      }
      default: return
    }
  }

  const checkQuestionType = (questionAndAnswer) => {
    for (const [key, value] of Object.entries(questionAndAnswer.type))
      if (value) return key;
  }


  const contentQuestionAnswer = questionsAndAnswers.map((questionAndAnswer, index) => {
    const questionType = checkQuestionType(questionAndAnswer);

    return (
      <div key={questionAndAnswer.ID} className={classes['poll-question']}>
        <div className={classes['poll-question-content']}>
          <p>{questionAndAnswer.question_text}</p>
          <div className={classes['question-content']}>
            <div onChange={(e) => changeInputValueHandler(e, index)} className={classes.answers}>
              {addAnswer(questionType, questionAndAnswer.answers, index)}
            </div>
          </div>
        </div>
      </div>
    )
  })

  return (
    <>
      <div className={classes['sub-nav']}>
        <h2>{pollInfo.poll_name}</h2>
      </div>
      <Form onSubmit={submitHandler} className={classes["poll-container"]}>
        {contentQuestionAnswer}
        <Button type={'submit'} style={`margin: 0 auto`}>
          Wyślij formularz
        </Button>
      </Form>
    </>
  )
}

export default PollForm;