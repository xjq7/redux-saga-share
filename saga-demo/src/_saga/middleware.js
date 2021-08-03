import channel from "./channel"
import proc from "./proc"

export default function createSagaMiddleware() {
  let _store
  function sagaMiddleware(store) {
    _store = store
    return next => (action) => {
      const result = next(action)
      channel.put(action)
      return result
    }
  }

  sagaMiddleware.run = function (saga) {
    const iterator = saga()
    proc.call(_store, iterator)
  }
  return sagaMiddleware
}
