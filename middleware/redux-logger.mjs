export default function createLoggerMiddleware() {
  // next:老的 dispatch
  return (store) => (next) => (action) => {
    console.log("logger start----- action type=", action.type)
    const result = next(action)
    console.log("logger end----- action type=", action.type)
    return result
  }
}
