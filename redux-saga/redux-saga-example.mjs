import { createStore, applyMiddlewares, combineReducer } from "../redux/redux-combineReducer.mjs"
import { createSagaMiddleware, call, take, put, select, all, fork, cancel } from "./index.mjs"
import createLoggerMiddleware from "../middleware/redux-logger.mjs"
import { sleep } from "../util.mjs"

async function fetchUser(name) {
  return sleep(2).then(() => ({ name, age: 10, cm: 168 }))
}

const getUser = (payload) => ({ type: "GET_USER", payload })

function* sagaUser() {
  console.log(1);
  let res = yield call(fetchUser, "name")
  console.log(res,'res1');
  res = yield call(fetchUser, "ccc")
  console.log(res,'res2');

}

function* sagaBook() {
  while (true) {
    try {
      const payload = yield take("GET_USER")
      const f = yield fork(sagaUser)
      yield cancel(f)
    } catch (error) {
      console.log(error)
    }finally{
      
    }
  }
}

export function bookReducer(state = {}, action) {
  switch (action.type) {
    case "GET_BOOK_SUCCESS":
      return { ...state, ...action.payload }
  }
  return state
}

export function userReducer(state = {}, action) {
  switch (action.type) {
    case "GET_USER_SUCCESS":
      return { ...state, ...action.payload }
  }
  return state
}

const sagaMiddleware = createSagaMiddleware()

const reducers = combineReducer({ book: bookReducer, user: userReducer })

const store = createStore(reducers, applyMiddlewares([createLoggerMiddleware(), sagaMiddleware]))

sagaMiddleware.run(sagaBook)

console.log("current store state = ", store.getState())

store.dispatch(getUser({ name: "xxx" }))

// store.dispatch(getUser({name:'jjj'}))

setTimeout(() => {
  console.log("current store state = ", store.getState())
}, 5000)
