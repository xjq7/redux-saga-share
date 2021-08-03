// 支持中间件
export function createStore(reducer, enhance) {
  let state = {}

  if (typeof enhance === "function") {
    return enhance(createStore)(reducer)
  }

  function getState() {
    return state
  }

  function dispatch(action) {
    console.log("dispatch is call and action is ", action)
    try {
      state = reducer(state, action)
    } catch (error) {}
    return action
  }

  return {
    getState,
    dispatch,
  }
}

// [a,b,c]
// =>
// a(b(c(dispatch)))

const compose = (array) => {
  return array.reduce(
    (acc, cur) =>
      (...args) =>
        acc(cur(...args))
  )
}

// logger(thunk(dispatch))
export function applyMiddlewares(middlewares) {
  return (createStore) => (reducer) => {
    let store = createStore(reducer)
    const chain = middlewares.map((middleware) => middleware(store))
    const dispatch = compose(chain)(store.dispatch)
    return { ...store, dispatch }
  }
}
