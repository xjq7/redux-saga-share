import { GET_USER_SUCCESS, RESET_SUCCESS } from "../const/user"

export function userReducer(state = {}, action) {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return { ...state, ...action.payload }
    case RESET_SUCCESS:
      return {}
    default:
  }
  return state
}

