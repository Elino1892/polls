import PollItem from "./PollItem";


const PollList = ({ polls }) => {

  return <ul>
    {polls.map(poll => (
      <PollItem
        key={poll.id}
        name={poll.name}
        description={poll.description}
        deadline={poll.deadline}
      />
    ))}
  </ul>
}

export default PollList;