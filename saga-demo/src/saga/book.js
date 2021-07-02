import { call, take, put, select, fork, delay, join, spawn, cancel, cancelled, actionChannel, flush, all, race, takeEvery } from "redux-saga/effects"
import { ADD_COUNT_AUTO, ADD_COUNT_AUTO_SUCCESS, RESET_BOOK, RESET_BOOK_SUCCESS } from "../const/book"
import { sleep } from "../util"

function task1() {
  return sleep(2).then(() => "task1")
}

function task2() {
  return sleep(1).then(() => "task2")
}

function* autoAddCount() {
  yield delay(2000)
  yield put({
    type: ADD_COUNT_AUTO_SUCCESS,
  })
}

export function* sagaAutoAddBookCount() {
  yield takeEvery(ADD_COUNT_AUTO, autoAddCount)
}

export function* sagaResetBook() {
  while (true) {
    yield take(RESET_BOOK)
    yield put({ type: RESET_BOOK_SUCCESS })
  }
}
