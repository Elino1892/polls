import { useState, useEffect } from "react";
import { useParams } from "react-router";
import PollItem from "../components/Polls/PollItem";


const PollPage = () => {

  const params = useParams();
  const { pollId } = params;

  const [loadedPoll, setLoadedPoll] = useState({});

  useEffect(() => {
    const fetchPoll = async () => {
      const respone = await fetch(`/api/polls/${pollId}`);
      if (!respone.ok) {
        throw new Error('Coś poszło nie tak!');
      }

      const responeData = await respone.json();

      const poll = {
        id: responeData.ID,
        name: responeData.poll_name,
        description: responeData.poll_description,
        deadline: responeData.deadline,
      }


      // for (const key in responeData) {
      //   polls.push({
      //     id: key,
      //     name: responeData[key].poll_name,
      //     description: responeData[key].poll_description,
      //     deadline: responeData[key].deadline,
      //   });
      // }

      setLoadedPoll(poll);
    }
    fetchPoll();
  }, [pollId])

  return (
    <PollItem name={loadedPoll.name} description={loadedPoll.description} deadline={loadedPoll.description} />
  )
}

export default PollPage;