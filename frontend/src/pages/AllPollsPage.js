// localhost:3000/polls
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
// import { listPolls } from "../store/actions/poll-actions";
import { listUserGroups } from "../store/actions/group-actions";
import { listUserPolls } from "../store/actions/userPoll-actions";


import LoadingSpinner from '../components/UI/LoadingSpinner'
import Layout from "../components/Layout/Layout/Layout";
import Polls from "../components/Polls/Polls";
import GroupList from "../components/Groups/GroupList";

const AllPollsPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const pollList = useSelector(state => state.pollList)
  // const { error, loading: loadingPolls, polls } = pollList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userGroupList = useSelector(state => state.userGroupList);
  const { loading: loadingUserGroups, userGroups } = userGroupList;

  const userPollList = useSelector(state => state.userPollList);
  const { error, userPolls, loading } = userPollList;


  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      dispatch(listUserGroups(userInfo.id));
      // if (userGroups) {
      //   console.log(userGroups)
      //   dispatch(listUserPolls(userInfo.id, userGroups))
      // }
      // if (userPolls) {
      //   filterGroupAndPolls();
      // }
    }

  }, [dispatch, userInfo, navigate])


  useEffect(() => {
    if (userGroups.length && userInfo) {
      dispatch(listUserPolls(userInfo.id, userGroups))
    }
  }, [dispatch, userInfo, userGroups])



  return <>
    {
      // !userPolls.length ? <LoadingSpinner />
      loading || loadingUserGroups ? <LoadingSpinner />
        : error ? <h2>Błąd: {error}</h2>
          :
          <>
            <h3 style={{ textAlign: 'center' }}>Należysz do grup:</h3>
            <GroupList groups={userGroups} />


            <Polls polls={userPolls} />
          </>
    }
  </>
}

export default AllPollsPage;