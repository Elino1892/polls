import PollItem from "./PollItem";
import { Table } from 'react-bootstrap'

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
  )
}

export default PollList;