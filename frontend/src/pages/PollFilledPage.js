import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { getPoll } from "../store/actions/poll-actions";

import PollFilled from "../components/Polls/PollFilled";
import Layout from '../components/Layout/Layout/Layout';
import LoadingSpinner from '../components/UI/LoadingSpinner';


const PollFilledPage = () => {

  const params = useParams()
  const { pollId } = params;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
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

  // const content = ({

  //   Object.keys(answers).length === 0 ? <LoadingSpinner />
  //     : <PollFilled answers={answers} />
  // })

  // const content = () => {
  //   console.log(answers)
  //   if (answers !== undefined) {
  //     Object.keys(answers).length === 0 ? <LoadingSpinner />
  //       : <PollFilled answers={answers} />
  //   }
  // }




  return (
    <>
      {Object.keys(poll).length === 0 ? <LoadingSpinner />
        : <PollFilled poll={poll} />
      }
    </>
  )
}

export default PollFilledPage;