import {
  USER_POLL_LIST_REQUEST,
  USER_POLL_LIST_SUCCESS,
  USER_POLL_LIST_FAIL,
  USER_POLL_LIST_RESET,
} from "../../constants/userPollConstants";

export const userPollListReducer = (state = { userPolls: [] }, action) => {
  switch (action.type) {
    case USER_POLL_LIST_REQUEST:
      return { loading: true, userPolls: [] }

    case USER_POLL_LIST_SUCCESS:
      return { loading: false, userPolls: action.payload }

    case USER_POLL_LIST_FAIL:
      return { loading: false, error: action.payload }

    case USER_POLL_LIST_RESET:
      return { userPolls: [] }

    default:
      return state
  }
}