import { GET_USER_SUCCESS, RESET_USER_SUCCESS } from "../const/user"

export function user(state = {}, action) {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return { ...state, ...action.payload }
    case RESET_USER_SUCCESS:
      return {}
    default:
  }
  return state
}

