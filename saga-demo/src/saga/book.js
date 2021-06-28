import { call, take, put, select } from "redux-saga/effects"
import {
  GET_BOOK,
  GET_BOOK_SUCCESS,
  RESET,
  RESET_SUCCESS,
  GET_BOOK_LOADING,
  ADD_BOOK_PAGE,
  ADD_BOOK_PAGE_LOADING,
  ADD_BOOK_PAGE_SUCCESS,
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
    const { payload } = yield take(GET_BOOK)
    yield put({ type: GET_BOOK_LOADING })
    const res = yield call(fetchBook, payload.name)
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
      console.log(error);
    }
  }
}

export function* sagaReset() {
  while (true) {
    yield take(RESET)
    yield put({ type: RESET_SUCCESS })
  }
}
