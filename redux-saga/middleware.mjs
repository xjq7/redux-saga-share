import channel from "./channel.mjs"
import proc from "./proc.mjs"

export function createSagaMiddleware() {
  let _store
  function sagaMiddleware(store) {
    _store = store
    return (next) => (action) => {
      console.log('saga start--- action type=',action.type)
      const result = next(action)
      console.log('saga end--- action type=',action.type)
      const { type, payload } = action
      channel.put(type, payload)
      return result
    }
  }

  sagaMiddleware.run = function (saga) {
    const iterator = saga()
    proc.call(_store, iterator)
  }
  return sagaMiddleware
}
