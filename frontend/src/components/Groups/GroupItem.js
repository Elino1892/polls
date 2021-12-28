import { ListGroup } from "react-bootstrap";


const GroupItem = ({ name }) => {
  return <ListGroup.Item>
    {name}
  </ListGroup.Item>
}

export default GroupItem;