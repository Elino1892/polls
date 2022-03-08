import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer } from './reducers/user-reducer';
import { pollListReducer, pollReducer, pollDescriptionCreatePollReducer, sentPollReducer, pollDeleteReducer } from './reducers/poll-reducer';
import { userGroupListReducer } from './reducers/userGroup-reducer';
import { userPollListReducer } from './reducers/userPoll-reducer';
import { answersByPollIdReducer, answersQuestionCreatePoll, questionsAndAnswersCreatePoll } from './reducers/answer-reducer';
import { groupListReducer, groupDeleteReducer, groupDetailsReducer, groupUpdateReducer, groupCreateReducer } from './reducers/group-reducer';


export const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,

  pollList: pollListReducer,
  pollForm: pollReducer,
  pollDescriptionCreatePoll: pollDescriptionCreatePollReducer,
  sentPoll: sentPollReducer,
  pollDelete: pollDeleteReducer,


  userGroupList: userGroupListReducer,

  userPollList: userPollListReducer,

  answersByPollId: answersByPollIdReducer,
  answersCreatePoll: answersQuestionCreatePoll,
  allQuestionsAnswersCreatePoll: questionsAndAnswersCreatePoll,

  allGroupList: groupListReducer,
  groupDelete: groupDeleteReducer,
  groupDetails: groupDetailsReducer,
  groupUpdate: groupUpdateReducer,
  groupCreate: groupCreateReducer,
})


const userInfoFromStorage = localStorage.getItem('userInfo') ?
  JSON.parse(localStorage.getItem('userInfo')) : null

const userGroupsFromStorage = localStorage.getItem('userGroups') ?
  JSON.parse(localStorage.getItem('userGroups')) : null


const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  userGroupList: { userGroups: userGroupsFromStorage },
}

const middleware = [thunk]

const store = createStore(reducer, initialState,
  composeWithDevTools(applyMiddleware(...middleware)))



export default store;