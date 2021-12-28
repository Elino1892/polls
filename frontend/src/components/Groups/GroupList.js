import GroupItem from "./GroupItem";
import { ListGroup, Alert } from "react-bootstrap";


const GroupList = ({ groups }) => {

  return <ListGroup horizontal>
    {groups.map((group) => {
      if (group.groupName !== 'Wszyscy') {
        return <GroupItem
          key={group.ID}
          name={group.groupName}
        />
      } else if (group.groupName === 'Wszyscy' && groups.length === 1) {
        const randomNumber = Math.floor(Math.random() * 100000)
        return (
          <Alert key={randomNumber} variant="info" style={{ width: '100%', textAlign: 'center' }}>
            Nie należysz do żadnej z grup
          </Alert >
        )
      }
    })
    }
  </ListGroup>
}

export default GroupList;