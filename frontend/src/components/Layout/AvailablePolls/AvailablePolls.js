import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


import './AvailablePolls.scss'

const AvailablePolls = () => {

  const [availablePolls, setAvailablePolls] = useState([])

  useEffect(() => {
    const fetchAvailablePolls = async () => {
      const respone = await fetch('/api/polls/');
      if (!respone.ok) {
        throw new Error('Coś poszło nie tak!');
      }

      const responeData = await respone.json();

      const polls = []

      for (const key in responeData) {
        polls.push({
          id: responeData[key].ID,
          name: responeData[key].poll_name,
          description: responeData[key].poll_description,
          deadline: responeData[key].deadline,
        });
      }

      setAvailablePolls(polls);

    }
    fetchAvailablePolls();
  }, [])

  return (
    <div className="selected-polls">
      <h2>Wypełnij jedną z dostępnych ankiet</h2>
      <div className="polls">

        {availablePolls.map(poll => (
          <div key={poll.id} className="poll"><Link to={`polls/${poll.id}`}>{poll.name}</Link></div>
        )
        )}

        {/* <div className="poll"><Link to="">Ankieta 1</Link></div>
        <div className="poll"><Link to="">Ankieta 2</Link></div>
        <div className="poll"><Link to="">Ankieta 3</Link></div>
        <div className="poll"><Link to="">Ankieta 4</Link></div>
        <div className="poll"><Link to="">Ankieta 5</Link></div>
        <div className="poll"><Link to="">Ankieta 6</Link></div> */}
        <h2 className="margin-top-h2">lub <Link to="/polls" className="green-text">sprawdź</Link> wszystkie dostępne ankiety.</h2>
      </div>
    </div>
  )
}

export default AvailablePolls;