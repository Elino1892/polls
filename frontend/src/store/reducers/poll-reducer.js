import {
  POLL_LIST_REQUEST,
  POLL_LIST_SUCCESS,
  POLL_LIST_FAIL,
  POLL_LIST_RESET,

  POLL_REQUEST,
  POLL_SUCCESS,
  POLL_FAIL,
  POLL_RESET,

  SENT_CREATED_POLL_REQUEST,
  SENT_CREATED_POLL_SUCCESS,
  SENT_CREATED_POLL_FAIL,

  POLL_DESCRIPTION_CREATE_POLL_REQUEST,
  POLL_DESCRIPTION_CREATE_POLL_SUCCESS,
  POLL_DESCRIPTION_CREATE_POLL_FAIL,
  POLL_DESCRIPTION_CREATE_POLL_RESET,

  POLL_DELETE_REQUEST,
  POLL_DELETE_SUCCESS,
  POLL_DELETE_FAIL,
} from '../../constants/pollConstants';


export const pollListReducer = (state = { polls: [] }, action) => {
  switch (action.type) {
    case POLL_LIST_REQUEST:
      return { loading: true, polls: [] }

    case POLL_LIST_SUCCESS:
      return { loading: false, polls: action.payload }

    case POLL_LIST_FAIL:
      return { loading: false, error: action.payload }

    case POLL_LIST_RESET:
      return { polls: [] }

    default:
      return state
  }
}


export const pollReducer = (state = { poll: {} }, action) => {
  switch (action.type) {
    case POLL_REQUEST:
      return { loading: true, poll: {} }

    case POLL_SUCCESS:
      return { loading: false, poll: action.payload }

    case POLL_FAIL:
      return { loading: false, error: action.payload }

    case POLL_RESET:
      return { poll: {} }

    default:
      return state
  }
}


export const pollDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case POLL_DELETE_REQUEST:
      return { loading: true }

    case POLL_DELETE_SUCCESS:
      return { loading: false, success: true }

    case POLL_DELETE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const sentPollReducer = (state = false, action) => {
  switch (action.type) {
    case SENT_CREATED_POLL_REQUEST:
      return { loading: true }

    case SENT_CREATED_POLL_SUCCESS:
      return { loading: false }

    case SENT_CREATED_POLL_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const pollDescriptionCreatePollReducer = (state = { pollDescription: {} }, action) => {
  switch (action.type) {
    case POLL_DESCRIPTION_CREATE_POLL_REQUEST:
      return { loading: true, pollDescription: {} }

    case POLL_DESCRIPTION_CREATE_POLL_SUCCESS:
      return { loading: false, pollDescription: action.payload }

    case POLL_DESCRIPTION_CREATE_POLL_FAIL:
      return { loading: false, error: action.payload }

    case POLL_DESCRIPTION_CREATE_POLL_RESET:
      return { pollDescription: {} }

    default:
      return state
  }
}
