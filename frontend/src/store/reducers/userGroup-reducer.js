import {
  USER_GROUP_LIST_REQUEST,
  USER_GROUP_LIST_SUCCESS,
  USER_GROUP_LIST_FAIL,
  USER_GROUP_LIST_RESET,
} from "../../constants/userGroupConstants";

export const userGroupListReducer = (state = { userGroups: [] }, action) => {
  switch (action.type) {
    case USER_GROUP_LIST_REQUEST:
      return { loading: true, userGroups: [] }

    case USER_GROUP_LIST_SUCCESS:
      return { loading: false, userGroups: action.payload }

    case USER_GROUP_LIST_FAIL:
      return { loading: false, error: action.payload }

    case USER_GROUP_LIST_RESET:
      return { userGroups: [] }

    default:
      return state
  }
}