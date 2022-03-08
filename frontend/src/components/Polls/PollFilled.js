import { Form, FloatingLabel } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Button from '../UI/Button'
import classes from "./PollForm/PollForm.module.css"

const PollFilled = ({ poll }) => {

  const { poll_info: pollInfo, questions_answers: questionsAndAnswers } = poll;

  const addAnswer = (questionType, answers, index) => {
    switch (questionType) {
      case 'is_single_choice': {
        if (!answers.length) {
          return;
        }
        const content = answers.map(answer => {
          if (answer.isMarked) {
            return (

              <div key={answer.id} className="mb-3">
                <Form.Check
                  type='radio'
                  id={answer.id}
                  required
                  value={answer.answer_text}
                  label={answer.answer_text}
                  name={'poll-option'}
                  disabled
                  checked
                />
              </div>
            )
          } else {
            return (

              <div key={answer.id} className="mb-3">
                <Form.Check
                  type='radio'
                  id={answer.id}
                  required
                  value={answer.answer_text}
                  label={answer.answer_text}
                  name={'poll-option'}
                  disabled
                />
              </div>
            )
          }

        })

        return content;
      }
      case 'is_multi_choice': {
        if (!answers.length) {
          return;
        }
        const content = answers.map(answer =>
          answer.isMarked ?

            <div key={answer.id} className="mb-3">
              <Form.Check
                type='checkbox'
                name={answer.answer_text}
                id={answer.id}
                value={answer.answer_text}
                label={answer.answer_text}
                disabled
                checked
              />
            </div>
            :
            <div key={answer.id} className="mb-3">
              <Form.Check
                type='checkbox'
                name={answer.answer_text}
                id={answer.id}
                value={answer.answer_text}
                label={answer.answer_text}
                disabled
              />
            </div>
        )

        return content;
      }
      case 'is_open': {
        const content =

          <FloatingLabel
            controlId="floatingTextarea2"
            key={answers[0].id}
          >
            <Form.Control
              id={answers[0].id}
              value={answers[0].openAnswer}
              disabled
              as="textarea"
              style={{ height: '100px' }}
            />
          </FloatingLabel>
        return content;
      }
      case 'is_date_choice': {
        const content =
          <Form.Control
            type="date"
            name="answer-date"
            key={answers[0].id}
            disabled
            value={answers[0].dateAnswer}
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
            <div className={classes.answers}>
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
      <div className={classes["poll-container"]}>
        {contentQuestionAnswer}
        <LinkContainer to="/polls">
          <Button>
            Wróć do wszystkich ankiet
          </Button>
        </LinkContainer>
      </div>
    </>
  )
}

export default PollFilled;