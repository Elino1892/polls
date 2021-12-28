import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, FormControl } from "react-bootstrap";
import { getAnswersQuestionCreatePoll } from "../../../store/actions/answer-actions";

const PollOptionAnswer = ({ typeAnswer, id, isSaved, onRemoveOptionAnswer }) => {

  const [answerInputValue, setAnswerInputValue] = useState("");

  // const answerInputRef = useRef()

  const dispatch = useDispatch();

  const answersCreatePoll = useSelector(state => state.answersCreatePoll);
  const { answersQuestion } = answersCreatePoll;

  const changeValueHandler = useCallback((e) => {
    const { value } = e.target;


    // console.log(answersQuestion)
    // dispatch(getAnswersQuestionCreatePoll(answer, answersQuestion))
    setAnswerInputValue(value);

    // console.log(value)
  }, [])

  // const resetInputValue = useCallback(() => {
  //   setAnswerInputValue("");
  // }, [])

  const blurValueHandler = useCallback(() => {
    if (answerInputValue === "") return;
    const answer = {
      "id": id,
      "answerText": answerInputValue
    }
    dispatch(getAnswersQuestionCreatePoll(answer, answersQuestion))
  }, [answerInputValue, answersQuestion, dispatch, id])

  // const defaultContent = (
  //   <>
  //     <label>
  //       <input disabled type="radio" name="opcja" id="opcja1" value="opcja1" />
  //       <input onChange={changeValueChandler} type="text" placeholder="Odpowiedź" />
  //     </label>
  //     {/* <label>
  //       <input disabled type="radio" name="opcja" id="opcja1" value="opcja1" />
  //       <input type="text" placeholder="Opcja 2" />
  //     </label> */}
  //   </>
  // )

  const [contentOptionAnswer, setContentOptionAnswer] = useState(null);


  const checkTypeAnswer = useCallback(() => {

    let content = null;

    // console.log(isSaved);

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
              {/* <div style={{ width: '100%', marginLeft: '10px' }}> */}
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
              {/* </div> */}
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
              // placeholder="Wpisz swoją odpowiedź"
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
    // resetInputValue();
    // if (answerInputValue) {
    //   // console.log(answerInputValue)
    //   onGetAnswer(answerInputValue, id)
    // }
  }, [checkTypeAnswer])

  // useEffect(() => {
  //   // onst { value } = answerInputRef.currentc
  //   if (answerInputRef !== undefined) {
  //     console.log(answerInputRef)
  // onGetAnswer(answerInputRef.current.value)
  //   }
  // }, [answerInputRef, onGetAnswer])
  return (
    <>
      {contentOptionAnswer}
    </>
  )
}

export default PollOptionAnswer;