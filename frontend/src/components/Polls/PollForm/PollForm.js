import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { FloatingLabel, Form } from "react-bootstrap";

import { sentAnswersFromUser } from "../../../store/actions/answer-actions";

import Input from "../../UI/Input";

import Button from "../../UI/Button";
import classes from "./PollForm.module.css"


const PollForm = ({ poll }) => {

  const navigate = useNavigate();
  const { poll_info: pollInfo, questions_answers: questionsAndAnswers } = poll;

  const params = useParams();
  const { pollId } = params;
  // const arrayTypes = setArrayToAnswers()
  const testArray = []

  const setArrayToAnswers = () => {
    const array = [];
    // console.log(questionsAndAnswers)
    questionsAndAnswers.forEach(question => {
      // console.log(question)
      // console.log(question.is_multi_choice)
      if (question.type.is_multi_choice) {
        const tempArray = [];
        // const arrayTmp = [];
        // let answerObj = {}
        question.answers.forEach(item => testArray.push(item))
        // question.answers.forEach(item => tempArray.push({}))
        array.push(tempArray);
        // testArray.push(answerObj);
      } else {
        array.push({})
      }
    })
    return array;
  }

  const dispatch = useDispatch();

  // const answersFromUser = useSelector(state => state.answersFromUser);
  // const { answers } = answersFromUser;



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
    // console.log(answers)
    // console.log(tempAnswers)
    const isEmptyForm = checkAnswersIsEmpty();
    removeEmptyValue()
    if (isEmptyForm) {
      throw new Error('Error with form!')
    } else {
      // console.log(tempAnswers)
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
      // answers.push(answer);

      // onChangeAnswer(answer)
      // dispatch(answersList(answers));
    } else if (e.target.type === 'checkbox') {
      const isChecked = e.target.checked;


      const answer = {
        type: 'checkbox',
        id: e.target.id,
        value: e.target.value,
      }


      if (isChecked) {
        // console.log(testArray);
        testArray.forEach((item, indexItem) => {
          if (item.id === +answer.id) {
            tempArray[index][indexItem] = answer
          }
        })
      } else {
        // console.log(testArray);
        testArray.forEach((item, indexItem) => {
          if (item.id === +answer.id) {
            tempArray[index] = tempArray[index].filter(item => item.id !== answer.id)
            tempArray[index] = tempArray[index].filter(item => item)
            // tempArray[index].splice(indexItem, 1);
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
    // console.log(e.target.type)
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
        // console.log(answers)
        const content = answers.map(answer =>
          // <label key={answer.id}>
          <div key={answer.id} className="mb-3">
            <Form.Check
              type='checkbox'
              id={answer.id}
              value={answer.answer_text}
              label={answer.answer_text}
            />
          </div>
          // <input type="checkbox" name={answer.answer_text} id={answer.id} value={answer.answer_text} />
          // {answer.answer_text}
          // </label>
        )

        return content;
      }
      case 'is_open': {
        // console.log(answers)
        const content = <FloatingLabel
          controlId="floatingTextarea2"

          key={answers[0].id}
        // name="answer-open"
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
            // name="answer-date"
            id={answers[0].id}
          />

        //   <label key={answers[0].id}>
        //   <input required type="date" name="answer-date" id={answers[0].id} />
        // </label>
        return content
      }
      default: return
    }
  }

  const checkQuestionType = (questionAndAnswer) => {
    for (const [key, value] of Object.entries(questionAndAnswer.type))
      if (value) return key;
  }

  // const questionContent = <div className={classes['poll-question']}>
  //   <div className={classes['poll-question-content']}>
  //     <p>{questionAndAnswer.question_text}</p>
  //     <div className={classes['question-content']}>
  //       <div onChange={changeInputRadioValueHandler} className={classes.answers}>
  //         {addAnswer(questionType, questionAndAnswer.answers)}
  //       </div>
  //     </div>
  //   </div>
  // </div>


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