import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from 'react-redux'

import LoadingSpinner from '../components/UI/LoadingSpinner'
import Layout from "../components/Layout/Layout/Layout";
import { getPoll } from "../store/actions/poll-actions";
import PollForm from "../components/Polls/PollForm/PollForm";



const PollPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const { pollId } = params;

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin;

  const pollForm = useSelector(state => state.pollForm)
  const { poll } = pollForm;


  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (pollId) {
        dispatch(getPoll(pollId))
      }
    }
  }, [dispatch, navigate, userInfo, pollId])



  return (
    <>
      {Object.keys(poll).length === 0 ? <LoadingSpinner />
        : <PollForm poll={poll} />
      }
    </>
  )
}

export default PollPage;