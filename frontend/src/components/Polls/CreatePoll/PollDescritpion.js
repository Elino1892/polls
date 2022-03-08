import { useState, useRef, useEffect } from "react";
import { Form, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { allGroups } from "../../../store/actions/group-actions";
import { pollDescriptionCreatePoll } from "../../../store/actions/poll-actions";
import LoadingSpinner from '../../UI/LoadingSpinner'


import classes from "./PollDescription.module.css"

const PollDescription = () => {

  const [isSaved, setIsSaved] = useState(false)
  const [isClickedEverybodyCheckbox, setisClickedEverybodyCheckbox] = useState(false)
  const [isClickedAnotherCheckbox, setisClickedAnotherCheckbox] = useState(false)
  const [groupList, setGroups] = useState([])

  const namePollInputRef = useRef()
  const descriptionPollInputRef = useRef()
  const deadlinePollInputRef = useRef()

  const dispatch = useDispatch();

  const allGroupList = useSelector(state => state.allGroupList);
  const { groups, loading } = allGroupList;

  useEffect(() => {
    dispatch(allGroups());

  }, [dispatch])


  const checkClickedCheckbox = (tempArray) => {

    const isChecked = tempArray.findIndex(group => group.group_name === 'Wszyscy')

    if (isChecked !== -1) {
      setisClickedEverybodyCheckbox(true)
      setisClickedAnotherCheckbox(false)
    } else if (!tempArray.length) {
      setisClickedEverybodyCheckbox(false)
      setisClickedAnotherCheckbox(false)
    }
    else {
      setisClickedAnotherCheckbox(true)
      setisClickedEverybodyCheckbox(false)
    }
  }


  const savePollDescriptionHandler = () => {

    const { value: pollName } = namePollInputRef.current;
    const { value: pollDescription } = descriptionPollInputRef.current;
    const { value: pollDeadline } = deadlinePollInputRef.current;

    const pollDescriptionObject = {
      pollName,
      pollDescription,
      groupList,
      pollDeadline,
    }

    dispatch(pollDescriptionCreatePoll(pollDescriptionObject))

    setIsSaved(true)
  }

  const editPollDescriptionHandler = () => {
    setIsSaved(false)
  }

  const getGroupFromInput = (e) => {
    const tempArray = [...groupList]
    const { value, id } = e.target;
    const index = tempArray.findIndex(group => group.ID === id)

    if (index === -1) {
      const groupObject = {
        ID: id,
        group_name: value
      }
      tempArray.push(groupObject)
    } else {
      tempArray.splice(index, 1)
    }

    setGroups(tempArray);
    checkClickedCheckbox(tempArray);
  }


  return (
    <>
      {!loading ?
        <>
          <Card>
            <Card.Body>
              <Form.Group className="mb-3" controlId="formPollName">
                <Form.Control
                  required
                  type="text"
                  placeholder="Nazwa ankiety"
                  disabled={isSaved}
                  ref={namePollInputRef}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  required
                  disabled={isSaved}
                  name="answer-open"
                  as="textarea"
                  ref={descriptionPollInputRef}
                  placeholder="Opis..."
                  style={{ height: '100px' }}
                />
              </Form.Group>
              <Form.Group style={{ marginTop: '10px' }}>
                {
                  groups.map(group => {
                    if (group.group_name === 'Wszyscy') {
                      return (
                        <Form.Check
                          key={group.ID}
                          inline
                          onChange={getGroupFromInput}
                          disabled={isSaved || isClickedAnotherCheckbox} type="checkbox"
                          name={group.group_name}
                          id={group.ID}
                          value={group.group_name}
                          label={group.group_name}
                        />
                      )
                    }

                    else {
                      return (
                        <Form.Check
                          key={group.ID}
                          inline
                          onChange={getGroupFromInput}
                          disabled={isSaved || isClickedEverybodyCheckbox} type="checkbox"
                          name={group.group_name}
                          id={group.ID}
                          value={group.group_name}
                          label={group.group_name}
                        />
                      )
                    }


                  }
                  )
                }
              </Form.Group>
              <Form.Group style={{ marginTop: '10px' }}>
                <Form.Control
                  disabled={isSaved}
                  ref={deadlinePollInputRef}
                  type="datetime-local"
                  name="date-deadline"
                  id="date-deadline"
                  min={new Date().toISOString().split(".")[0]}
                />
              </Form.Group>

            </Card.Body>
            {!isSaved ? <div className={classes["poll-description-menu"]}>
              <Button variant="success" type="button" onClick={savePollDescriptionHandler}>Zapisz</Button>
            </div> :
              <div className={classes["poll-description-menu"]}>
                <Button variant="primary" type="button" onClick={editPollDescriptionHandler}>Edytuj</Button>
              </div>
            }
          </Card>
        </ > :
        <LoadingSpinner />
      }
    </>
  )
}

export default PollDescription;