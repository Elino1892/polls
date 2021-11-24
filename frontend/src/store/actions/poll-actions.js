import axios from 'axios';
import {
  POLL_LIST_REQUEST,
  POLL_LIST_SUCCESS,
  POLL_LIST_FAIL
} from '../../constants/pollsConstants';


export const listPolls = () => async (dispatch) => {
  try {
    dispatch({ type: POLL_LIST_REQUEST })

    const { data } = await axios.get('/api/polls');

    const polls = [];

    for (const key in data) {
      polls.push({
        id: key,
        name: data[key].poll_name,
        description: data[key].poll_description,
        deadline: data[key].deadline,
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