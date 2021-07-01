import { call, take, put, select, fork, delay, join, spawn, cancel,cancelled } from "redux-saga/effects"
import {
  GET_BOOK,
  GET_BOOK_SUCCESS,
  RESET,
  RESET_SUCCESS,
  GET_BOOK_LOADING,
  ADD_BOOK_PAGE,
  ADD_BOOK_PAGE_LOADING,
  ADD_BOOK_PAGE_SUCCESS,
  ADD_BOOK_PAGE_AUTO,
  ADD_BOOK_PAGE_AUTO_SUCCESS,
} from "../const/book"
import { sleep } from "../util"

function fetchBook(name) {
  return sleep(2).then(() => ({ name, page: 100 }))
}

function addBookPage(page) {
  return sleep(2).then(() => ({ page: page + 1 }))
}

export function* sagaGetBook() {
  while (true) {
    yield take(GET_BOOK)
    yield put({ type: GET_BOOK_LOADING })
    const res = yield call(fetchBook)
    yield put({ type: GET_BOOK_SUCCESS, payload: res })
  }
}

export function* sagaAddBookPage() {
  while (true) {
    try {
      yield take(ADD_BOOK_PAGE)
      yield put({ type: ADD_BOOK_PAGE_LOADING })
      const { page } = yield select((state) => state.bookReducer)
      const res = yield call(addBookPage, page)
      yield put({ type: ADD_BOOK_PAGE_SUCCESS, payload: res })
    } catch (error) {
      console.log(error)
    }
  }
}

export function* autoAddBookPage() {
  console.log(222)

  yield delay(2000)
  yield put({
    type: ADD_BOOK_PAGE_AUTO_SUCCESS,
  })
  console.log(333)
}

function* test1(){
  console.log('test1');
  console.log('test1');
  console.log('test1');
  yield delay(3000)
}

function* test2(){
  console.log('test2');
  yield delay(3000)
}

export function* sagaAutoAddBookPage() {
  while (true) {
    try {
      yield take(ADD_BOOK_PAGE_AUTO)
      yield fork(test1)
      yield fork(test2)
      // yield cancel()
      // yield join(task);
      console.log(111)
    } catch (error) {
      console.log("err")
    }
  }
}

export function* sagaReset() {
  while (true) {
    yield take(RESET)
    yield put({ type: RESET_SUCCESS })
  }
}
