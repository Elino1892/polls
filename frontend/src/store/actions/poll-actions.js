import axios from 'axios';
import url from '../../constants/URL';
import {
  POLL_LIST_REQUEST,
  POLL_LIST_SUCCESS,
  POLL_LIST_FAIL,

  POLL_REQUEST,
  POLL_SUCCESS,
  POLL_FAIL,

  POLL_DESCRIPTION_CREATE_POLL_REQUEST,
  POLL_DESCRIPTION_CREATE_POLL_SUCCESS,
  POLL_DESCRIPTION_CREATE_POLL_FAIL,

  SENT_CREATED_POLL_REQUEST,
  SENT_CREATED_POLL_SUCCESS,
  SENT_CREATED_POLL_FAIL,

  DOWNLOAD_REPORT_POLL_REQUEST,
  DOWNLOAD_REPORT_POLL_SUCCESS,
  DOWNLOAD_REPORT_POLL_FAIL,

  POLL_DELETE_REQUEST,
  POLL_DELETE_SUCCESS,
  POLL_DELETE_FAIL
} from '../../constants/pollConstants';


export const listPolls = () => async (dispatch) => {
  try {
    dispatch({ type: POLL_LIST_REQUEST })

    const { data } = await axios.get(`${url}/api/polls/all-data`);

    const polls = [];

    for (const key in data) {
      polls.push({
        id: data[key].poll.ID,
        name: data[key].poll.poll_name,
        description: data[key].poll.poll_description,
        deadline: data[key].poll.deadline,
        isFinished: data[key].poll.isFinished,
        groups: data[key].groups,
        user: data[key].user,
        questions: data[key].questions,
      });
    }

    dispatch({
      type: POLL_LIST_SUCCESS,
      payload: polls
    })
  } catch (error) {
    dispatch({
      type: POLL_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}

export const getPoll = (id) => async (dispatch) => {

  try {

    dispatch({ type: POLL_REQUEST });

    const { data } = await axios.get(`${url}/api/polls/${id}`);

    dispatch({
      type: POLL_SUCCESS,
      payload: data
    })


  } catch (error) {
    dispatch({
      type: POLL_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}


export const pollDescriptionCreatePoll = (pollDescription) => async (dispatch) => {

  try {

    dispatch({ type: POLL_DESCRIPTION_CREATE_POLL_REQUEST });


    dispatch({
      type: POLL_DESCRIPTION_CREATE_POLL_SUCCESS,
      payload: pollDescription
    })


  } catch (error) {
    dispatch({
      type: POLL_DESCRIPTION_CREATE_POLL_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}


export const deletePoll = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POLL_DELETE_REQUEST
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

    await axios.delete(
      `${url}/api/polls/delete/${id}/`,
      config
    )

    dispatch({
      type: POLL_DELETE_SUCCESS,
    })


  } catch (error) {
    dispatch({
      type: POLL_DELETE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    })
  }
}



export const sentNewPoll = (pollDescription, questionsAndAnswers) => async (dispatch) => {

  try {
    dispatch({ type: SENT_CREATED_POLL_REQUEST });


    const newPoll = {
      pollDescription,
      questionsAndAnswers
    }


    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    await axios.post(
      `${url}/api/polls/created-poll`,
      { newPoll: newPoll },
      config
    )

    dispatch({ type: SENT_CREATED_POLL_SUCCESS })


  } catch (error) {
    dispatch({
      type: SENT_CREATED_POLL_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}


export const downloadReport = (name, isAdmin) => async (dispatch) => {

  try {
    dispatch({ type: DOWNLOAD_REPORT_POLL_REQUEST })

    const headers = { 'Content-Type': 'blob' };
    const config = !isAdmin ? {
      method: 'GET', url: `${url}/api/polls/report/${name}`
      , responseType: 'arraybuffer', headers
    } :
      {
        method: 'GET', url: `${url}/api/polls/admin/report/${name}`
        , responseType: 'arraybuffer', headers
      }
      ;

    try {
      const { data } = await axios(config)

      const outputFilename = `Raport_ankieta_${name}.xlsx`;
      const url = URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', outputFilename);
      document.body.appendChild(link);
      link.click();

    } catch (error) {
      throw Error(error);
    }


    dispatch({ type: DOWNLOAD_REPORT_POLL_SUCCESS })
  } catch (error) {
    dispatch({
      type: DOWNLOAD_REPORT_POLL_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}
