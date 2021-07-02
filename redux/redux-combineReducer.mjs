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
    } catch (error) {
      console.log("dispatch error = ", error)
    }
    return action
  }

  dispatch({ type: "@type/init" })
  return {
    getState,
    dispatch,
  }
}

export function combineReducer(reducers) {
  return (state, action) => {
    const initialState = {}
    return Object.keys(reducers).reduce((acc, cur) => {
      acc[cur] = reducers[cur](state[cur], action)
      return acc
    }, initialState)
  }
}

// [a,b,c]
// =>
// a(b(c()))
const compose = (array) => {
  return array.reduce(
    (acc, cur) =>
      (...args) =>
        acc(cur(...args))
  )
}

// logger(thunk(dispatch))
export function applyMiddlewaresFake(middlewares) {
  return (createStore) => (reducer) => {
    let store = createStore(reducer)
    const chain = middlewares.map((middleware) => middleware(store))
    const dispatch = compose(chain)(store.dispatch)
    return { ...store, dispatch }
  }
}

export function applyMiddlewares(middlewares) {
  return (createStore) => (reducer) => {
    let store = createStore(reducer)
    let dispatch = () => {
      throw new Error("")
    }
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args),
    }
    const chain = middlewares.map((middleware) => middleware(middlewareAPI))
    dispatch = compose(chain)(store.dispatch)
    return { ...store, dispatch }
  }
}
