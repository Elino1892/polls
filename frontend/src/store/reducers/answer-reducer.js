import {
  SENT_ANSWER_FROM_USER_REQUEST,
  SENT_ANSWER_FROM_USER_SUCCESS,
  SENT_ANSWER_FROM_USER_FAIL,

  ANSWER_BY_POLL_ID_REQUEST,
  ANSWER_BY_POLL_ID_SUCCESS,
  ANSWER_BY_POLL_ID_FAIL,
  ANSWER_BY_POLL_ID_RESET,

  ANSWER_QUESTION_CREATE_POLL_REQUEST,
  ANSWER_QUESTION_CREATE_POLL_SUCCESS,
  ANSWER_QUESTION_CREATE_POLL_FAIL,
  ANSWER_QUESTION_CREATE_POLL_RESET,

  QUESTIONS_ANSWERS_CREATE_POLL_REQUEST,
  QUESTIONS_ANSWERS_CREATE_POLL_SUCCESS,
  QUESTIONS_ANSWERS_CREATE_POLL_FAIL,
  QUESTIONS_ANSWERS_CREATE_POLL_RESET,
} from '../../constants/answerConstants';




export const sentAnswerFromUserReducer = (state, action) => {
  switch (action.type) {
    case SENT_ANSWER_FROM_USER_REQUEST:
      return { loading: true }

    case SENT_ANSWER_FROM_USER_SUCCESS:
      return { loading: false, success: true, }

    case SENT_ANSWER_FROM_USER_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}


export const answersByPollIdReducer = (state = { answers: [] }, action) => {
  switch (action.type) {
    case ANSWER_BY_POLL_ID_REQUEST:
      return { loading: true }

    case ANSWER_BY_POLL_ID_SUCCESS:
      return { loading: false, answers: action.payload, }

    case ANSWER_BY_POLL_ID_FAIL:
      return { loading: false, error: action.payload }

    case ANSWER_BY_POLL_ID_RESET:
      return { answers: [] }

    default:
      return state
  }
}

export const answersQuestionCreatePoll = (state = { answersQuestion: [] }, action) => {
  switch (action.type) {
    case ANSWER_QUESTION_CREATE_POLL_REQUEST:
      return { loading: true }

    case ANSWER_QUESTION_CREATE_POLL_SUCCESS:
      return { loading: false, answersQuestion: action.payload, }

    case ANSWER_QUESTION_CREATE_POLL_FAIL:
      return { loading: false, error: action.payload }

    case ANSWER_QUESTION_CREATE_POLL_RESET:
      return { answersQuestion: [] }

    default:
      return state
  }
}



export const questionsAndAnswersCreatePoll = (state = { questionsAnswers: [] }, action) => {
  switch (action.type) {
    case QUESTIONS_ANSWERS_CREATE_POLL_REQUEST:
      return { loading: true }

    case QUESTIONS_ANSWERS_CREATE_POLL_SUCCESS:
      return { loading: false, questionsAnswers: action.payload, }

    case QUESTIONS_ANSWERS_CREATE_POLL_FAIL:
      return { loading: false, error: action.payload }

    case QUESTIONS_ANSWERS_CREATE_POLL_RESET:
      return { questionsAnswers: [] }

    default:
      return state
  }
}