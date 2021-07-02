import { createStore, combineReducer, applyMiddlewares ,applyMiddlewaresFake} from "./redux-combineReducer.mjs"
import createLoggerMiddleware from "../middleware/redux-logger.mjs"
import createThunkMiddleware from "../middleware/redux-thunk.mjs"
import { sleep } from "../util.mjs"

export function bookAction(name) {
  return function (dispatch, getState) {
    sleep(2).then(()=>{
      dispatch({ type: "GET_BOOK_SUCCESS", payload: { name } })
    })
  }
}

export function bookReducer(state = {}, action) {
  switch (action.type) {
    case "GET_BOOK_SUCCESS":
      return { ...state, ...action.payload }
  }
}

export function userAction(name) {
  return function (dispatch, getState) {
    return sleep(2).then(() => {
      dispatch({ type: "GET_USER_SUCCESS", payload: { name } })
    })
  }
}

export function userReducer(state = {}, action) {
  switch (action.type) {
    case "GET_USER_SUCCESS":
      return { ...state, ...action.payload }
  }
}

const reducers = combineReducer({ book: bookReducer, user: userReducer })
const store = createStore(reducers, applyMiddlewares([createLoggerMiddleware(), createThunkMiddleware()]))

console.log(store.getState())
store.dispatch(bookAction("提问的艺术"))

setTimeout(() => {
  console.log(store.getState())
}, 5000)
