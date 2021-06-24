export default function createLoggerMiddleware() {
  // next:老的 dispatch
  return (store) => (next) => (action) => {
    console.log("fake logger start----- action type=", action.type)
    const result = next(action)
    console.log("fake logger end----- action type=", action.type)
    return result
  }
}
