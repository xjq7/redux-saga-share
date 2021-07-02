import { all, fork } from "redux-saga/effects"
import { sagaAutoAddBookCount, sagaResetBook } from "./book"
import { sagaGetUser, sagaResetUser } from "./user"

const queue = []
queue.push(sagaGetUser)
queue.push(sagaResetBook)
queue.push(sagaResetUser)
queue.push(sagaAutoAddBookCount)

export default function* rootSaga() {
  yield all(queue.map((task) => fork(task)))
}
