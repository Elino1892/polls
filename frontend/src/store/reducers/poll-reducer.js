import {
  POLL_LIST_REQUEST,
  POLL_LIST_SUCCESS,
  POLL_LIST_FAIL
} from '../../constants/pollsConstants';


export const pollListReducer = (state = { polls: [] }, action) => {
  switch (action.type) {
    case POLL_LIST_REQUEST:
      return { loading: true, polls: [] }

    case POLL_LIST_SUCCESS:
      return { loading: false, polls: action.payload }

    case POLL_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}