import axios from 'axios';
import {
  USER_GROUP_LIST_REQUEST,
  USER_GROUP_LIST_SUCCESS,
  USER_GROUP_LIST_FAIL,
} from "../../constants/userGroupConstants";

import {
  GROUP_LIST_REQUEST,
  GROUP_LIST_SUCCESS,
  GROUP_LIST_FAIL,
  GROUP_LIST_RESET,

  GROUP_DETAILS_REQUEST,
  GROUP_DETAILS_SUCCESS,
  GROUP_DETAILS_FAIL,
  GROUP_DETAILS_RESET,

  GROUP_CREATE_REQUEST,
  GROUP_CREATE_SUCCESS,
  GROUP_CREATE_FAIL,
  GROUP_CREATE_RESET,

  GROUP_UPDATE_REQUEST,
  GROUP_UPDATE_SUCCESS,
  GROUP_UPDATE_FAIL,
  GROUP_UPDATE_RESET,

  GROUP_DELETE_REQUEST,
  GROUP_DELETE_SUCCESS,
  GROUP_DELETE_FAIL

} from "../../constants/groupsConstants"

export const listUserGroups = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_GROUP_LIST_REQUEST })

    console.log('jestem')

    const { data: userGroups } = await axios.get('/api/user-groups');

    const userGroupsID = []

    userGroups.forEach(item => {
      if (item.user === id) {
        userGroupsID.push(item.group);
      }
    });

    const { data: groups } = await axios.get('/api/groups');

    const userGroupsName = []

    groups.forEach(group => {
      userGroupsID.forEach((userGroupID) => {
        if (group.ID === userGroupID) {
          userGroupsName.push({
            groupID: group.ID,
            groupName: group.group_name
          });
        }
      })

    })

    console.log(userGroupsName)

    localStorage.setItem('userGroups', JSON.stringify(userGroupsName))

    dispatch({
      type: USER_GROUP_LIST_SUCCESS,
      payload: userGroupsName
    })
  } catch (error) {
    dispatch({
      type: USER_GROUP_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}


export const getGroupDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GROUP_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/groups/${id}/`)

    dispatch({
      type: GROUP_DETAILS_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: GROUP_DETAILS_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    })
  }
}


export const allGroups = () => async (dispatch) => {
  try {
    dispatch({ type: GROUP_LIST_REQUEST })

    const { data } = await axios.get('/api/groups');


    dispatch({
      type: GROUP_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: GROUP_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}



export const deleteGroup = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GROUP_DELETE_REQUEST
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
      `/api/groups/delete/${id}/`,
      config
    )

    dispatch({
      type: GROUP_DELETE_SUCCESS,
    })


  } catch (error) {
    dispatch({
      type: GROUP_DELETE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    })
  }
}




export const createGroup = (group) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GROUP_CREATE_REQUEST
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



    await axios.post(
      '/api/groups/create',
      group,
      config
    )
    dispatch({
      type: GROUP_CREATE_SUCCESS,
    })


  } catch (error) {
    dispatch({
      type: GROUP_CREATE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    })
  }
}



export const updateGroup = (group) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GROUP_UPDATE_REQUEST
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
      `/api/groups/update/${group.id}/`,
      group,
      config
    )
    dispatch({
      type: GROUP_UPDATE_SUCCESS,
      payload: data,
    })


    dispatch({
      type: GROUP_DETAILS_SUCCESS,
      payload: data
    })


  } catch (error) {
    dispatch({
      type: GROUP_UPDATE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    })
  }
}


