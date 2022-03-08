import { LinkContainer } from "react-router-bootstrap";
import Button from '../UI/Button'


const PollFinished = () => {
  return (
    <div>
      <p>Dziękujemy za wypełnienie ankiety! Możesz teraz wrócić do wyboru dostępnych ankiet.</p>
      <LinkContainer to="/polls">
        <Button>
          Moje ankiety
        </Button>
      </LinkContainer>
    </div>
  )
}

export default PollFinished;