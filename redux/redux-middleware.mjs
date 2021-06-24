// 支持中间件
export function createStore(reducer, enhance) {
  let state = {}
  let isDispatching = false

  if (typeof enhance === "function") {
    return enhance(createStore)(reducer)
  }

  function getState() {
    return state
  }

  function dispatch(action) {
    console.log("dispatch is call and action is ", action)
    try {
      isDispatching = true
      state = reducer(state, action)
    } catch (error) {
      isDispatching = false
    }
    return action
  }

  return {
    getState,
    dispatch,
  }
}

export function applyMiddlewareFake(middleware) {
  return (createStore) => (reducer) => {
    let store = createStore(reducer)
    let dispatch = middleware(store)(store.dispatch)
    return { ...store, dispatch }
  }
}

export function applyMiddleware(middleware) {
  return (createStore) => (reducer) => {
    let store = createStore(reducer)
    let dispatch = () => {
      throw new Error("")
    }
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args),
    }
    dispatch = middleware(middlewareAPI)(store.dispatch)
    return { ...store, dispatch }
  }
}


