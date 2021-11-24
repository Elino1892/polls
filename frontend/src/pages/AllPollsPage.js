// localhost:3000/polls

import { useState, useEffect } from "react";
import PollList from "../components/Polls/PollList";

const AllPollsPage = () => {

  const [loadedPolls, setLoadedPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      const respone = await fetch('/api/polls/');
      if (!respone.ok) {
        throw new Error('Coś poszło nie tak!');
      }

      const responeData = await respone.json();

      const polls = []

      for (const key in responeData) {
        polls.push({
          id: key,
          name: responeData[key].poll_name,
          description: responeData[key].poll_description,
          deadline: responeData[key].deadline,
        });
      }

      setLoadedPolls(polls);

    }
    fetchPolls();
  }, [])

  return <section>
    <h1>Ankiety:</h1>
    <PollList polls={loadedPolls} />
  </section>
}

export default AllPollsPage;