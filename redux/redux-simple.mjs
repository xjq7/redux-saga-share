// 最简版本的redux
export function createStore(reducer) {
  let state
  let isDispatching = false

  function getState() {
    return state
  }

  function dispatch(action) {
    console.log('dispatch and action =',action)
    try {
      isDispatching = true
      state = reducer(state, action)
    } catch (error) {
      isDispatching = false
    }
  }

  // dispatch({ type: "@type/init" })
  return {
    getState,
    dispatch,
  }
}