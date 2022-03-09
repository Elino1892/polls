import axios from "axios";
import URL from '../../constants/URL';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,

  USER_LOGOUT,

  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,

  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,

  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,

  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,

  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,

  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET
} from "../../constants/userConstants";

import { POLL_LIST_RESET, POLL_DESCRIPTION_CREATE_POLL_RESET, POLL_RESET, DOWNLOAD_REPORT_POLL_RESET } from '../../constants/pollConstants'

import { USER_GROUP_LIST_RESET } from "../../constants/userGroupConstants";

import { USER_POLL_LIST_RESET } from "../../constants/userPollConstants";

import {
  ANSWER_BY_POLL_ID_RESET,
  ANSWER_QUESTION_CREATE_POLL_RESET,
  QUESTIONS_ANSWERS_CREATE_POLL_RESET,
} from '../../constants/answerConstants';

import {
  GROUP_LIST_RESET,
  GROUP_DETAILS_RESET,
  GROUP_CREATE_RESET,
  GROUP_UPDATE_RESET,
} from "../../constants/groupsConstants"


export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    })

    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    const { data } = await axios.post(
      `${URL}/api/users/login/`,
      { 'username': email, 'password': password },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data))

  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    })
  }
}



export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    })

    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    const { data } = await axios.post(
      `${URL}/api/users/register/`,
      { 'name': name, 'email': email, 'password': password },
      config
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data))

  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    })
  }
}


export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_DETAILS_RESET })
  dispatch({ type: USER_UPDATE_PROFILE_RESET })
  dispatch({ type: POLL_LIST_RESET })

  dispatch({ type: USER_GROUP_LIST_RESET })
  dispatch({ type: USER_POLL_LIST_RESET })
  dispatch({ type: USER_LIST_RESET })

  dispatch({ type: ANSWER_BY_POLL_ID_RESET })
  dispatch({ type: ANSWER_QUESTION_CREATE_POLL_RESET })
  dispatch({ type: QUESTIONS_ANSWERS_CREATE_POLL_RESET })

  dispatch({ type: GROUP_LIST_RESET })
  dispatch({ type: GROUP_DETAILS_RESET })
  dispatch({ type: GROUP_CREATE_RESET })
  dispatch({ type: GROUP_UPDATE_RESET })

  dispatch({ type: POLL_DESCRIPTION_CREATE_POLL_RESET })
  dispatch({ type: DOWNLOAD_REPORT_POLL_RESET })

  dispatch({ type: POLL_RESET })
  dispatch({ type: USER_UPDATE_RESET })


}


export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(
      `${URL}/api/users/${id}/`,
      config
    )

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    })


  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    })
  }
}


export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(
      `${URL}/api/users/profile/update/`,
      user,
      config
    )

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data))

  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    })
  }
}


export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(
      `${URL}/api/users/`,
      config
    )

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data
    })


  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    })
  }
}


export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.delete(
      `${URL}/api/users/delete/${id}/`,
      config
    )

    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data
    })


  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    })
  }
}


export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(
      `${URL}/api/users/update/${user.id}/`,
      user,
      config
    )

    dispatch({
      type: USER_UPDATE_SUCCESS,
    })

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    })


  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    })
  }
}