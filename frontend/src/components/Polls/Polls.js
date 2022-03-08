import classes from './PollList.module.css'
import { Alert } from 'react-bootstrap';
import PollList from "./PollList";

const Polls = ({ polls }) => {

  const allPolls = [...polls];

  const availablePolls = allPolls.map((poll => {

    const filtered = poll.polls.filter(item => !item.isFinished)
    const randomNumber = Math.floor(Math.random() * 1000);

    if (filtered.length) {
      return <PollList key={randomNumber} groupName={poll.groupName} polls={filtered} isCompleted={false} />
    }
    return false
  }))

  const finishedPolls = allPolls.map((poll => {
    const randomNumber = Math.floor(Math.random() * 1000);
    const filtered = poll.polls.filter(item => item.isFinished)
    if (filtered.length) {
      return <PollList key={randomNumber} groupName={poll.groupName} polls={filtered} isCompleted={true} />
    }
    return false
  }))

  return (
    <div className={classes["selected-polls"]}>
      <h2 style={{ textAlign: 'center', marginTop: '10px' }}>Dostępne ankiety:</h2>
      {availablePolls[0] !== false && availablePolls.length ? availablePolls : <Alert variant="info">
        Brak dostępnych ankiet
      </Alert >}
      <h2 style={{ textAlign: 'center' }}>Zakończone ankiety:</h2>
      {finishedPolls[0] !== false && finishedPolls.length ? finishedPolls : <Alert variant="info">
        Brak zakończonych ankiet
      </Alert >}

    </div>
  )
}

export default Polls;