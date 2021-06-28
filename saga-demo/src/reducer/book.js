import { GET_BOOK_SUCCESS, RESET_SUCCESS, GET_BOOK_LOADING, ADD_BOOK_PAGE_SUCCESS } from "../const/book"

export function bookReducer(state = { fetchLoading: false }, action) {
  switch (action.type) {
    case GET_BOOK_SUCCESS:
      return { ...state, fetchLoading: false, ...action.payload }
    case GET_BOOK_LOADING:
      return { ...state, fetchLoading: true }
    case ADD_BOOK_PAGE_SUCCESS:
      console.log(action.payload);
      return { ...state, page: action.payload.page }
    case RESET_SUCCESS:
      return {}
    default:
  }
  return state
}
