export default function createThunkMiddleware() {
  return (store) =>
    (next) =>
    (action) => {
      console.log("thunk start----- action type=", action)
      if (typeof action === "function") { 
        return action(store.dispatch, store.getState)
      }
      next(action)
      console.log("thunk end----- action type=", action.type)
    }
}
