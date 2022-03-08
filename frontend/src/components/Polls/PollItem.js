import { useDispatch } from 'react-redux'
import Button from '../UI/Button'
import { LinkContainer } from 'react-router-bootstrap';
import { downloadReport } from '../../store/actions/poll-actions';

const PollItem = ({ name, description, deadline, id, isFinished, groupName }) => {

  const dispatch = useDispatch();

  const downloadReportHandler = () => {
    dispatch(downloadReport(name, false));
  }

  return (
    <>
      <td>{name}</td>
      <td>{description}</td>
      <td>
        <p>{deadline.slice(0, 10)}</p>
        <p>{deadline.slice(11, 19)}</p>
      </td>
      <td>{groupName}</td>
      {!isFinished
        ?
        <td>
          <LinkContainer to={`/polls/${id}`}>
            <Button style={{ margin: '0 auto' }}>
              Wypełnij
            </Button>
          </LinkContainer>
        </td>
        :
        <>
          <td style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <LinkContainer to={`/polls/${id}/filled-poll`}>
              <Button style={{ margin: '0 auto' }}>
                Zobacz
              </Button>
            </LinkContainer>
          </td>

          <td style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}> <Button style={{ margin: '0 auto' }} onClick={downloadReportHandler}>Raport</Button></td>
        </>
      }
    </>)
}

export default PollItem;