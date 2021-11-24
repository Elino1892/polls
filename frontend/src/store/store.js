import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/user-reducer';
import { pollListReducer } from './reducers/poll-reducer';


// import { configureStore } from "@reduxjs/toolkit";
// import logger from 'redux-logger'
// import userLoginSlice from "./slices/user-slice";
// import pollsSlice from "./slices/polls-slice";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,

  pollList: pollListReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
  JSON.parse(localStorage.getItem('userInfo')) : null


// const preloadedState = {
//   userLogin: { userInfo: userInfoFromStorage }
// }

// const reducer = {
//   userLogin: userLoginSlice.reducer
// }

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
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