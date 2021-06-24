import { createStore, applyMiddlewares, combineReducer } from "../redux/redux-combineReducer.mjs"
import { createSagaMiddleware, call, take, put, select, all } from "./index.mjs"
import createLoggerMiddleware from "../middleware/redux-logger.mjs"
import { sleep } from "../util.mjs"

async function getUser(name) {
  return sleep(2).then(() => ({ name, age: 10, cm: 168 }))
}

function* sagaBook() {
  while (true) {
    try {
      const payload = yield take("GET_USER")
      const { name } = payload
      const res = yield all({ u1: call(getUser, name), u2: call(getUser, name) })
      console.log(res,'res')
      yield put({ type: "GET_USER_SUCCESS", payload: res })
    } catch (error) {
      console.log(error)
    }
  }
}

export function bookReducer(state = {}, action) {
  switch (action.type) {
    case "GET_BOOK_SUCCESS":
      return { ...state, ...action.payload }
  }
}

export function userReducer(state = {}, action) {
  switch (action.type) {
    case "GET_USER_SUCCESS":
      return { ...state, ...action.payload }
  }
}

const sagaMiddleware = createSagaMiddleware()

const reducers = combineReducer({ book: bookReducer, user: userReducer })

const store = createStore(reducers, applyMiddlewares([createLoggerMiddleware(), sagaMiddleware]))

sagaMiddleware.run(sagaBook)

console.log("current store state = ", store.getState())

store.dispatch({ type: "GET_USER", payload: { name: "xjq" } })

setTimeout(() => {
  console.log("current store state = ", store.getState())
}, 5000)
