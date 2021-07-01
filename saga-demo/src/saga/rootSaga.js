import { all, fork } from "redux-saga/effects"
import { sagaGetBook, sagaReset, sagaAddBookPage } from "./book"
import { sagaGetUser } from "./user"

const queue = []
queue.push(sagaGetUser)
queue.push(sagaGetBook)
queue.push(sagaReset)

export default function* rootSaga() {
  yield all(queue.map((task) => fork(task)))
}
