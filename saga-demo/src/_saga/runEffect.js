import channel from './channel' 

const runEffect = {
  take: runTakeEffect,
  call: runCallEffect,
  put: runPutEffect,
}

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

export default runEffect