// 最简版本的redux
export function createStore(reducer) {
  let state={}

  function getState() {
    return state
  }

  function dispatch(action) {
    console.log("dispatch and action =", action)
    try {
      state = reducer(state, action)
    } catch (error) {}
  }

  return {
    getState,
    dispatch,
  }
}
