import { GET_USER, RESET } from "../const/user"

export function getUser(payload) {
  return {
    type: GET_USER,
    payload,
  }
}

export function resetUser(){
  return {
    type: RESET,
  }
}