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
    }
    return action
  }

  return {
    getState,
    dispatch,
  }
}

export function applyMiddleware(middleware) {
  return (createStore) => (reducer) => {
    // 创建store
    let store = createStore(reducer)
    // 强化dispatch
    let dispatch = middleware(store)(store.dispatch)
    // 替换dispatch为强化后的
    return { ...store, dispatch }
  }
}


