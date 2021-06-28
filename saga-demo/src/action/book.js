import { ADD_BOOK_PAGE, GET_BOOK, RESET } from "../const/book"

export function getBook(payload) {
  return {
    type: GET_BOOK,
    payload,
  }
}

export function resetBook() {
  return {
    type: RESET,
  }
}

export function addBookPage() {
  return {
    type: ADD_BOOK_PAGE,
  }
}
