import { ADD_COUNT_AUTO_SUCCESS, RESET_BOOK_SUCCESS } from "../const/book"

const initState = {
  count: 0,
}

export function book(state = initState, action) {
  switch (action.type) {
    case ADD_COUNT_AUTO_SUCCESS:
      return { ...state, count: state.count + 1 }
    case RESET_BOOK_SUCCESS:
      return initState
    default:
  }
  return state
}
