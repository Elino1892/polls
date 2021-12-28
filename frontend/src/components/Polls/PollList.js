import PollItem from "./PollItem";
import classes from './PollList.module.css'
import { Table, Alert } from 'react-bootstrap'

const PollList = ({ groupName, polls, isCompleted }) => {

  return (
    polls.length !== 0 &&

    <Table striped bordered hover responsive className='table-sm'>
      <thead>
        <tr>
          <th>NAZWA</th>
          <th>OPIS</th>
          <th>TERMIN</th>
          <th>GRUPY</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {polls.map(poll =>
          // const randomNumber = Math.floor(Math.random() * 1000);
          <tr key={poll.pollID}>

            <PollItem
              key={poll.pollID}
              name={poll.pollName}
              description={poll.pollDescription}
              deadline={poll.deadline}
              isFinished={poll.isFinished}
              id={poll.pollID}
              groupName={groupName}
            />

          </tr>
        )
        }
      </tbody>
    </Table>
    // :
    // (
    //   !isCompleted ?
    //     <Alert variant="info">
    //       Brak dostępnych ankiet
    //     </Alert >
    //     :
    //     <Alert variant="info">
    //       Brak zakończonych ankiet
    //     </Alert >

    // )

    // <div className={classes.polls}>
    // <h2>{groupName}</h2>

    // </div >
  )
}

export default PollList;