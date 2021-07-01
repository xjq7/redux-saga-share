import { call, take, put } from "redux-saga/effects"
import { GET_USER, GET_USER_SUCCESS } from "../const/user"
import { sleep } from "../util"

function fetchUser(name) {
  return sleep(2).then(() => ({ name, age: 66 }))
}

export function* sagaGetUser() {
  while (true) {
    const { payload } = yield take(GET_USER)
    const res = yield call(fetchUser, payload.name)
    yield put({ type: GET_USER_SUCCESS, payload: res })
  }
}
