import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from "../../constants/userConstants";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  userInfo: {},
  error: '',
}

const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {
    userLogin(state = {}, action) {
      switch (action.type) {
        case USER_LOGIN_REQUEST:
          return { loading: true }

        case USER_LOGIN_SUCCESS:
          return { loading: false, userInfo: action.payload }

        case USER_LOGIN_FAIL:
          return { loading: false, error: action.payload }

        case USER_LOGOUT:
          return {}

        default:
          return state;
      }
    },
  }
})

export const userLoginActions = userLoginSlice.actions;

export default userLoginSlice;