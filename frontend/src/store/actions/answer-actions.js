import axios from 'axios';
import {
  SENT_ANSWER_FROM_USER_REQUEST,
  SENT_ANSWER_FROM_USER_SUCCESS,
  SENT_ANSWER_FROM_USER_FAIL,

  ANSWER_BY_POLL_ID_REQUEST,
  ANSWER_BY_POLL_ID_SUCCESS,
  ANSWER_BY_POLL_ID_FAIL,

  ANSWER_QUESTION_CREATE_POLL_REQUEST,
  ANSWER_QUESTION_CREATE_POLL_SUCCESS,
  ANSWER_QUESTION_CREATE_POLL_FAIL,
  // ANSWER_QUESTION_CREATE_POLL_RESET,

  QUESTIONS_ANSWERS_CREATE_POLL_REQUEST,
  QUESTIONS_ANSWERS_CREATE_POLL_SUCCESS,
  QUESTIONS_ANSWERS_CREATE_POLL_FAIL,
  // QUESTIONS_ANSWERS_CREATE_POLL_RESET,
} from '../../constants/answerConstants';

export const sentAnswersFromUser = (answers, pollId) => async (dispatch, getState) => {
  try {
    dispatch({ type: SENT_ANSWER_FROM_USER_REQUEST })

    // const {
    //   answersFromUser: { answers },
    // } = getState();

    // answers.push(answer)

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    // const answers = []

    // answers.push(answer);
    // const data = {
    //   userID: userInfo.id,
    //   answers
    // }
    // console.log(answers)

    await axios.put(`/api/polls/${pollId}/finished-poll`,
      answers,
      config
    );

    // const userGroupsID = []

    // userGroups.forEach(item => {
    //   if (item.user === id) {
    //     userGroupsID.push(item.group);
    //   }
    // });

    // const { data: groups } = await axios.get('/api/groups');

    // const userGroupsName = []

    // groups.forEach(group => {
    //   userGroupsID.forEach((userGroupID) => {
    //     if (group.ID === userGroupID) {
    //       userGroupsName.push({
    //         groupID: group.ID,
    //         groupName: group.group_name
    //       });
    //     }
    //   })

    // })


    dispatch({
      type: SENT_ANSWER_FROM_USER_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: SENT_ANSWER_FROM_USER_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}



export const getAnswersByPollId = (pollId) => async (dispatch) => {
  try {
    dispatch({ type: ANSWER_BY_POLL_ID_REQUEST })



    const { data } = await axios.get(`/api/polls/${pollId}`,);



    dispatch({
      type: ANSWER_BY_POLL_ID_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ANSWER_BY_POLL_ID_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}


export const getAnswersQuestionCreatePoll = (answer, answersQuestion) => async (dispatch) => {
  try {
    dispatch({ type: ANSWER_QUESTION_CREATE_POLL_REQUEST })

    // const {
    //   answersCreatePoll: { answersQuestion },
    // } = getState()

    let item = {};
    let idArray = 0;
    const answers = [...answersQuestion]
    answers.forEach((answerItem, index) => {
      if (answerItem.id === answer.id) {
        item = { ...answerItem };
        idArray = index;
      }
    })

    // console.log(item)
    // console.log(answer)


    if (item.id === answer.id) {
      answers[idArray].answerText = answer.answerText
    } else {
      answers.push(answer)
    }


    // console.log(answers)




    dispatch({
      type: ANSWER_QUESTION_CREATE_POLL_SUCCESS,
      payload: answers
    })
  } catch (error) {
    dispatch({
      type: ANSWER_QUESTION_CREATE_POLL_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}


export const getQuestionsAnswersCreatePoll = (newQuestionAnswersObject, questionsAnswers, isRepeated) => async (dispatch) => {
  try {
    dispatch({ type: QUESTIONS_ANSWERS_CREATE_POLL_REQUEST })

    const questionsAndAnswersArray = [...questionsAnswers]
    if (isRepeated) {
      questionsAndAnswersArray.forEach((item, index) => {
        if (item.id === newQuestionAnswersObject.id) {
          questionsAndAnswersArray[index] = newQuestionAnswersObject
        }
      })
    } else {
      questionsAndAnswersArray.push(newQuestionAnswersObject)
    }
    // const {
    //   answersCreatePoll: { answersQuestion },
    // } = getState()

    // let item = {};
    // let idArray = 0;
    // const answers = [...answersQuestion]
    // answers.forEach((answerItem, index) => {
    //   if (answerItem.id === answer.id) {
    //     item = { ...answerItem };
    //     idArray = index;
    //   }
    // })

    // console.log(item)
    // console.log(answer)


    // if (item.id === answer.id) {
    //   answers[idArray].answerText = answer.answerText
    // } else {
    //   answers.push(answer)
    // }


    // console.log(answers)

    // console.log(questionsAndAnswersArray)


    dispatch({
      type: QUESTIONS_ANSWERS_CREATE_POLL_SUCCESS,
      payload: questionsAndAnswersArray
    })
  } catch (error) {
    dispatch({
      type: QUESTIONS_ANSWERS_CREATE_POLL_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}