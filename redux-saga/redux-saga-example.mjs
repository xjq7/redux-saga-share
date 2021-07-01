import { createStore, applyMiddlewares, combineReducer } from "../redux/redux-combineReducer.mjs"
import { createSagaMiddleware, call, take, put, select, all, fork, cancel, delay } from "./index.mjs"
import createLoggerMiddleware from "../middleware/redux-logger.mjs"
import { sleep } from "../util.mjs"

async function fetchUser(name) {
  return sleep(2).then(() => ({ name, age: 10, cm: 168 }))
}

async function fetchBook(name) {
  return sleep(2).then(() => ({ name, page: 100 }))
}

const getUser = (payload) => ({ type: "GET_USER", payload })
const getBook = (payload) => ({ type: "GET_BOOK", payload })

function* sagaUser() {
  const payload = yield take("GET_USER1")
  let res = yield call(fetchUser, "name")
  res = yield call(fetchUser, "ccc")
}

function* sagaBook() {
  while (true) {
    try {
      const payload = yield take("GET_BOOK")
      let res = yield all([call(fetchBook, "name"), call(fetchBook, "name")])
      yield take("GET_USER")
      console.log(res, "rr")
    } catch (error) {
      console.log(error)
    } finally {
    }
  }
}

const sagas = [sagaBook, sagaUser]

function* rootSaga() {
  yield all(sagas.map((saga) => fork(saga)))
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

sagaMiddleware.run(rootSaga)

console.log("current store state = ", store.getState())

store.dispatch(getBook({ name: "xxx" }))


setTimeout(() => {
  console.log("current store state = ", store.getState())
  // store.dispatch(getUser({ name: "xxx" }))
}, 5000)
