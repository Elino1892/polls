import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer } from './reducers/user-reducer';
import { pollListReducer, pollReducer, pollDescriptionCreatePollReducer, sentPollReducer, pollDeleteReducer } from './reducers/poll-reducer';
import { userGroupListReducer } from './reducers/userGroup-reducer';
import { userPollListReducer } from './reducers/userPoll-reducer';
import { answersByPollIdReducer, answersQuestionCreatePoll, questionsAndAnswersCreatePoll } from './reducers/answer-reducer';
import { groupListReducer, groupDeleteReducer, groupDetailsReducer, groupUpdateReducer, groupCreateReducer } from './reducers/group-reducer';

// import { sentAnswerFromUserReducer } from './reducers/answer-reducer';


// import { configureStore } from "@reduxjs/toolkit";
// import logger from 'redux-logger'
// import userLoginSlice from "./slices/user-slice";
// import pollsSlice from "./slices/polls-slice";

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
  // answersFromUser: sentAnswerFromUserReducer,
})


const userInfoFromStorage = localStorage.getItem('userInfo') ?
  JSON.parse(localStorage.getItem('userInfo')) : null

const userGroupsFromStorage = localStorage.getItem('userGroups') ?
  JSON.parse(localStorage.getItem('userGroups')) : null


// const preloadedState = {
//   userLogin: { userInfo: userInfoFromStorage }
// }

// const reducer = {
//   userLogin: userLoginSlice.reducer
// }

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  userGroupList: { userGroups: userGroupsFromStorage },
}

const middleware = [thunk]

const store = createStore(reducer, initialState,
  composeWithDevTools(applyMiddleware(...middleware)))

// const store = configureStore({
//   reducer,
//   preloadedState,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
// });


export default store;