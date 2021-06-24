import { take } from "./effect.mjs"
import channel from "./channel.mjs"
import proc from "./proc.mjs"

function runTakeEffect({ pattern }, next) {
  channel.take({
    pattern,
    cb: (args) => next(null, args),
  })
}

function runCallEffect({ fn, args }, next, store) {
  fn.call(null, ...args)
    .then((success) => next(null, success))
    .catch((error) => next(error))
}

function runPutEffect({ action }, next, store) {
  store.dispatch(action)
  next()
}

function runForkEffect({ saga }, next, store) {
  const iterator = saga()
  proc.call(store, iterator)
  next(null)
}

function runTakeEveryEffect({ pattern, saga }, next, store) {
  function* takeEvery() {
    while (true) {
      yield take(pattern)
      yield fork(saga)
    }
  }
  runForkEffect({ saga: takeEvery }, next, store)
}

function runSelectEffect({ selector }, next, store) {
  try {
    if (typeof selector === "function") {
      next(null, selector(store.getState()))
    } else {
      next(null, store.getState())
    }
  } catch (error) {
    next(error)
  }
}

function runAllEffect({ obj }, next) {
  const objToArray = Object.keys(obj).map((key) => {
    return { key, obj: obj[key] }
  })
  const promisesResults = {}
  Promise.all(objToArray.map(({ obj: { fn, args } }) => fn(...args)))
    .then((results) => {
      results.forEach((v, i) => {
        promisesResults[objToArray[i].key] = v
      })
      next(null, promisesResults)
    })
    .catch((err) => {
      next(err)
    })
}

export default {
  take: runTakeEffect,
  call: runCallEffect,
  put: runPutEffect,
  fork: runForkEffect,
  takeEvery: runTakeEveryEffect,
  select: runSelectEffect,
  all: runAllEffect,
}
