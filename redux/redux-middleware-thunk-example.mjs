import { createStore, applyMiddleware } from "./redux-middleware.mjs"
import createThunkMiddleware from "../middleware/redux-thunk.mjs"
import { sleep } from "../util.mjs"

export function bookAction(name) {
  return (dispatch, getState) =>
    sleep(2).then(() => {
      dispatch({ type: "GET_BOOK_SUCCESS", payload: { name } })
    })
}

export function bookReducer(state = {}, action) {
  switch (action.type) {
    case "GET_BOOK_SUCCESS":
      return { ...state, ...action.payload }
  }
}

const store = createStore(bookReducer, applyMiddleware(createThunkMiddleware()))

console.log("current store state = ", store.getState())
store.dispatch(bookAction("提问的艺术"))

setTimeout(() => {
  console.log("current store state = ", store.getState())
}, 3000)
