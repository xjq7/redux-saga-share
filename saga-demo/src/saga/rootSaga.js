import { all, fork } from "redux-saga/effects"
import { sagaGetBook, sagaReset, sagaAddBookPage } from "./book"
import { sagaGetUser } from "./user"

const queue = [sagaGetUser, sagaGetBook, sagaReset, sagaAddBookPage]

export default function* rootSaga() {
  yield all(queue.map((task) => fork(task)))
}
