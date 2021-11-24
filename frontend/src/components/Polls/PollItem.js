const PollItem = ({ name, description, deadline }) => {
  return <li>
    Nazwa: {name}.
    Opis: {description}
    Czas zakończenia: {deadline}
  </li>
}

export default PollItem;