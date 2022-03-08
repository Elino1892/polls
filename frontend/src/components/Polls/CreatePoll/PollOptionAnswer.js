import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { getAnswersQuestionCreatePoll } from "../../../store/actions/answer-actions";

const PollOptionAnswer = ({ typeAnswer, id, isSaved, onRemoveOptionAnswer }) => {

  const [answerInputValue, setAnswerInputValue] = useState("");

  const dispatch = useDispatch();

  const answersCreatePoll = useSelector(state => state.answersCreatePoll);
  const { answersQuestion } = answersCreatePoll;

  const changeValueHandler = useCallback((e) => {
    const { value } = e.target;
    setAnswerInputValue(value);

  }, [])


  const blurValueHandler = useCallback(() => {
    if (answerInputValue === "") return;
    const answer = {
      "id": id,
      "answerText": answerInputValue
    }
    dispatch(getAnswersQuestionCreatePoll(answer, answersQuestion))
  }, [answerInputValue, answersQuestion, dispatch, id])


  const [contentOptionAnswer, setContentOptionAnswer] = useState(null);


  const checkTypeAnswer = useCallback(() => {

    let content = null;

    switch (true) {
      case typeAnswer.isSingleChoice: {

        content = (
          <>
            <Form.Label style={{ display: 'flex', margin: '20px 0' }}>
              <Form.Check
                style={{ display: 'flex', alignItems: 'center' }}
                type='radio'
                disabled
              />
              {!isSaved ?
                <Form.Control
                  style={{ height: '100%', marginLeft: '10px' }}
                  onBlur={blurValueHandler}
                  onChange={changeValueHandler}
                  value={answerInputValue}
                  type="text"
                  placeholder="Odpowiedź" /> :
                <Form.Control
                  style={{ height: '100%' }}
                  disabled
                  onBlur={blurValueHandler}
                  onChange={changeValueHandler}
                  value={answerInputValue}
                  type="text"
                  placeholder="Odpowiedź" />
              }
            </Form.Label>

            <Button style={{ width: '20%' }} type="button" variant="danger" onClick={() => onRemoveOptionAnswer(id)}>Usuń opcję</Button>
          </>
        );

        break;
      }
      case typeAnswer.isMultiChoice: {
        content = (


          <>
            <Form.Label style={{ display: 'flex', margin: '20px 0' }}>
              <Form.Check
                style={{ display: 'flex', alignItems: 'center' }}
                type='checkbox'
                disabled
              />

              {!isSaved ?
                <Form.Control
                  style={{ height: '100%', marginLeft: '10px' }}
                  onBlur={blurValueHandler}
                  onChange={changeValueHandler}
                  value={answerInputValue}
                  type="text"
                  placeholder="Odpowiedź" /> :
                <Form.Control
                  style={{ height: '100%' }}
                  disabled
                  onBlur={blurValueHandler}
                  onChange={changeValueHandler}
                  value={answerInputValue}
                  type="text"
                  placeholder="Odpowiedź" />
              }

            </Form.Label>

            <Button style={{ width: '20%' }} type="button" variant="danger" onClick={() => onRemoveOptionAnswer(id)}>Usuń opcję</Button>
          </>
        );
        break;
      }
      case typeAnswer.isOpen: {
        content = (
          <>
            <Form.Control
              as="textarea"
              disabled
              style={{ margin: '20px 0' }}
            />
            <Button style={{ width: '20%' }} type="button" variant="danger" onClick={() => onRemoveOptionAnswer(id)}>Usuń opcję</Button>
          </>
        );
        break;
      }
      case typeAnswer.isDateChoice: {

        content = (
          <>
            <Form.Control
              disabled
              type="date"
              style={{ margin: '20px 0' }}
            />
            <Button style={{ width: '20%' }} type="button" variant="danger" onClick={() => onRemoveOptionAnswer(id)}>Usuń opcję</Button>
          </>
        );

        break;
      }
      default: {
        content = null;
      }
    }
    setContentOptionAnswer(content)
  }, [typeAnswer, answerInputValue, blurValueHandler, changeValueHandler, isSaved, onRemoveOptionAnswer, id])

  useEffect(() => {
    checkTypeAnswer();
  }, [checkTypeAnswer])

  return (
    <>
      {contentOptionAnswer}
    </>
  )
}

export default PollOptionAnswer;