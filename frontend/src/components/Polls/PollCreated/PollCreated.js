import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import LoadingSpinner from "../../UI/LoadingSpinner";

const PollCreated = () => {

  const sentPoll = useSelector(state => state.sentPoll)
  const { loading } = sentPoll

  return (
    <>
      {
        !loading ?
          <div>
            <p>Ankieta została utworzona! Już teraz, użytkownicy w poszczególnych grupach będą mogli wypełnić daną ankietę. Maile zostały wysłane z powiadomieniem o dostępności tej ankiety.</p>
            <Link to="/polls">Moje ankiety</Link>
          </div> : <LoadingSpinner />
      }
    </>
  )
}

export default PollCreated;