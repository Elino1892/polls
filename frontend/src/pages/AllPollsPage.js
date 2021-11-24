// localhost:3000/polls
import { useEffect } from "react";
import PollList from "../components/Polls/PollList";
import { useDispatch, useSelector } from 'react-redux';
import { listPolls } from "../store/actions/poll-actions";
import LoadingSpinner from '../components/UI/LoadingSpinner'

const AllPollsPage = () => {

  const dispatch = useDispatch();

  const pollList = useSelector(state => state.pollList)
  const { error, loading, polls } = pollList;

  useEffect(() => {

    dispatch(listPolls());

  }, [dispatch])

  return <section>
    <h1>Ankiety:</h1>
    {loading ? <LoadingSpinner />
      : error ? <h2>Błąd: {error}</h2>
        : <PollList polls={polls} />
    }
  </section>
}

export default AllPollsPage;