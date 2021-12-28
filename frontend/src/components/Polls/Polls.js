// import { useEffect, useCallback } from 'react';

import classes from './PollList.module.css'
import { Alert } from 'react-bootstrap';
import PollList from "./PollList";
import { useState } from 'react';

const Polls = ({ polls }) => {

  // const [isAvailablePollsEmpty, setIsAvailablePollsEmpty] = useState(true)
  // const [isFinishedPollsEmpty, setIsFinishedPollsEmpty] = useState(true)
  // console.log(allPolls)
  const allPolls = [...polls];

  // console.log(checkPollIsFinished(new Date()))

  const availablePolls = allPolls.map((poll => {

    const filtered = poll.polls.filter(item => !item.isFinished)
    // console.log(poll)
    const randomNumber = Math.floor(Math.random() * 1000);

    if (filtered.length) {
      return <PollList key={randomNumber} groupName={poll.groupName} polls={filtered} isCompleted={false} />
    }
    return false
  }))

  const finishedPolls = allPolls.map((poll => {
    // console.log(poll)
    const randomNumber = Math.floor(Math.random() * 1000);
    const filtered = poll.polls.filter(item => item.isFinished)
    // console.log(filtered)
    if (filtered.length) {
      // setIsFinishedPollsEmpty(false)
      return <PollList key={randomNumber} groupName={poll.groupName} polls={filtered} isCompleted={true} />
    }
    return false
  }))

  return (
    <div className={classes["selected-polls"]}>
      <h2 style={{ textAlign: 'center', marginTop: '10px' }}>Dostępne ankiety:</h2>
      {/* <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>NAZWA</th>
            <th>OPIS</th>
            <th>TERMIN</th>
            <th>GRUPY</th>
            <th></th>
          </tr>
        </thead>
      </Table> */}
      {availablePolls[0] !== false && availablePolls.length ? availablePolls : <Alert variant="info">
        Brak dostępnych ankiet
      </Alert >}
      <h2 style={{ textAlign: 'center' }}>Zakończone ankiety:</h2>
      {/* <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>NAZWA</th>
            <th>OPIS</th>
            <th>TERMIN</th>
            <th>GRUPY</th>
            <th></th>
          </tr>
        </thead>
      </Table> */}
      {/* {finishedPolls.length ? finishedPolls : <Alert variant="info">
        Brak zakończonych ankiet
      </Alert >} */}
      {finishedPolls[0] !== false && finishedPolls.length ? finishedPolls : <Alert variant="info">
        Brak zakończonych ankiet
      </Alert >}

    </div>
  )
}

export default Polls;