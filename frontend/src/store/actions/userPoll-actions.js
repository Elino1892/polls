import axios from 'axios';
import {
  USER_POLL_LIST_REQUEST,
  USER_POLL_LIST_SUCCESS,
  USER_POLL_LIST_FAIL,
} from "../../constants/userPollConstants";


export const listUserPolls = (id, userGroups) => async (dispatch) => {
  try {
    dispatch({ type: USER_POLL_LIST_REQUEST })

    const { data: userPolls } = await axios.get('/api/user-polls');

    const userPollsID = []

    userPolls.forEach(item => {
      if (item.user === id) {
        userPollsID.push(item.poll);
      }
    });


    const { data: polls } = await axios.get('/api/polls');

    // console.log(polls);

    const userAvailablePolls = []

    const { data: pollsGroups } = await axios.get('/api/polls-groups');

    // debugger

    polls.forEach(poll => {
      userPollsID.forEach((userPollID) => {
        if (poll.ID === userPollID) {
          userAvailablePolls.push({
            pollID: poll.ID,
            pollName: poll.poll_name,
            pollDescription: poll.poll_description,
            deadline: poll.deadline,
            isFinished: poll.isFinished
          });
        }
      })

    })



    const pollNameGroupID = []

    userAvailablePolls.forEach(userPoll => {
      pollsGroups.forEach(pollGroup => {
        if (userPoll.pollID === pollGroup.poll) {
          pollNameGroupID.push({
            groupID: pollGroup.group,
            pollID: userPoll.pollID,
            pollName: userPoll.pollName,
            pollDescription: userPoll.pollDescription,
            deadline: userPoll.deadline,
            isFinished: userPoll.isFinished
          })
        }
      })
    })


    const userPollsList = [];

    pollNameGroupID.forEach(pollGroup => {
      userGroups.forEach(userGroup => {
        if (pollGroup.groupID === userGroup.groupID) {
          userPollsList.push({
            groupName: userGroup.groupName,
            pollID: pollGroup.pollID,
            pollName: pollGroup.pollName,
            pollDescription: pollGroup.pollDescription,
            deadline: pollGroup.deadline,
            isFinished: pollGroup.isFinished
          })
        }
      })
    })







    // console.log(userPollsList)

    const tempUserPolls = [...userPollsList]

    for (let i = 0; i < tempUserPolls.length; i++) {
      for (let j = i + 1; j < tempUserPolls.length; j++) {
        if (tempUserPolls[i].pollID === tempUserPolls[j].pollID) {
          tempUserPolls.splice(j, 1);
        }
      }
    }

    const groupWithPolls = [];

    // debugger

    tempUserPolls.forEach(userPoll => {

      if (!groupWithPolls.length) {
        const poll = {
          groupName: userPoll.groupName,
          polls: [
            {
              pollID: userPoll.pollID,
              pollName: userPoll.pollName,
              pollDescription: userPoll.pollDescription,
              deadline: userPoll.deadline,
              isFinished: userPoll.isFinished
            }
          ]
        };
        groupWithPolls.push(poll);
      }

      else {
        // debugger
        groupWithPolls.forEach(groupWithPoll => {
          // groupWithPoll.polls.forEach(item => {
          // for (let i = 0; i < groupWithPoll.polls; i++) {



          // console.log(groupWithPoll)
          if (userPoll.groupName !== groupWithPoll.groupName) {
            const poll = {
              groupName: userPoll.groupName,
              polls: [
                {
                  pollID: userPoll.pollID,
                  pollName: userPoll.pollName,
                  pollDescription: userPoll.pollDescription,
                  deadline: userPoll.deadline,
                  isFinished: userPoll.isFinished
                }
              ]
            };
            groupWithPolls.push(poll);
          }

          else if (userPoll.groupName === groupWithPoll.groupName) {

            groupWithPoll.polls.forEach(item => {
              if (userPoll.pollID !== item.pollID) {
                groupWithPoll.polls.push({
                  pollID: userPoll.pollID,
                  pollName: userPoll.pollName,
                  pollDescription: userPoll.pollDescription,
                  deadline: userPoll.deadline,
                  isFinished: userPoll.isFinished
                })
              }
            })
          }
          // }
        })
        // })
      }
    })
    // console.log(groupWithPolls)

    // const deletedID = []
    // debugger
    for (let i = 0; i < groupWithPolls.length; i++) {
      for (let j = i + 1; j < groupWithPolls.length; j++) {
        if (groupWithPolls[i].groupName === groupWithPolls[j].groupName) {
          groupWithPolls[j] = '';
          // deletedID.push(j)
        }
      }
    }

    const groupWithPollsTemp = groupWithPolls.filter(item => item !== "")

    // debugger
    groupWithPollsTemp.forEach(poll => {
      for (let i = 0; i < poll.polls.length; i++) {
        for (let j = i + 1; j < poll.polls.length; j++) {
          if (poll.polls[i].pollID === poll.polls[j].pollID) {
            poll.polls[j] = '';
          }
        }
      }
      poll.polls = poll.polls.filter(poll => poll !== "")
    })

    // for (let i = 0; i < groupWithPolls.length; i++) {
    //   for (let j = 0; j < deletedID.length; j++) {
    //     if (i === deletedID[j]) {
    //       groupWithPolls.splice(i, 1);
    //     }
    //   }
    // }
    // debugger
    // console.log(groupWithPollsTemp)




    // console.log(userPollsList);

    dispatch({
      type: USER_POLL_LIST_SUCCESS,
      payload: groupWithPollsTemp
    })
  } catch (error) {
    dispatch({
      type: USER_POLL_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}