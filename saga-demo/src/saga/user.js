import { call, take, put } from "redux-saga/effects"
import { GET_USER, GET_USER_SUCCESS, RESET_USER_SUCCESS } from "../const/user"
import { sleep } from "../util"

function fetchUser (name) {
  return sleep(1).then(() => ({ name, seed: Math.random().toFixed(4) }))
}

export function* sagaGetUser () {
  while (true) {
    try {
      const { payload } = yield take(GET_USER)

      const res = yield call(fetchUser, payload.name)

      yield put({ type: GET_USER_SUCCESS, payload: res })

    } catch (error) {
      console.log(error);
    }
  }
}

export function* sagaResetUser () {
  yield put({ type: RESET_USER_SUCCESS })
}
