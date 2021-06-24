import { createStore, applyMiddlewares } from "./redux-middlewares.mjs"
import createLoggerMiddleware from "../middleware/redux-logger.mjs"
import createFakeLoggerMiddleware from "../middleware/redux-logger-fake.mjs"

const store = createStore(bookReducer, applyMiddlewares([createLoggerMiddleware(), createFakeLoggerMiddleware()]))

function bookAction(payload) {
  return { type: "BOOK", payload }
}

function bookReducer(state = {}, action) {
  switch (action.type) {
    case "BOOK":
      return { ...state, ...action.payload }
  }
}

console.log("dispatch start------  my store state=", store.getState())
store.dispatch(bookAction({ name: "提问的艺术" }))
console.log("dispatch end------  my store state=", store.getState())
