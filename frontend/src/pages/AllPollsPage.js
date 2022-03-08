import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { listUserGroups } from "../store/actions/group-actions";
import { listUserPolls } from "../store/actions/userPoll-actions";


import LoadingSpinner from '../components/UI/LoadingSpinner'
import Polls from "../components/Polls/Polls";
import GroupList from "../components/Groups/GroupList";

const AllPollsPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    }

  }, [dispatch, userInfo, navigate])


  useEffect(() => {
    if (userGroups.length && userInfo) {
      dispatch(listUserPolls(userInfo.id, userGroups))
    }
  }, [dispatch, userInfo, userGroups])



  return <>
    {
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