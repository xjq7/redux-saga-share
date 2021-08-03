import { createStore, applyMiddleware } from "./redux-middleware.mjs"
import createLoggerMiddleware from "../middleware/redux-logger.mjs"

export function bookReducer (state = {}, action) {
  switch (action.type) {
    case "BOOK":
      return { ...state, name: action.payload.name }
  }
}

const store = createStore(bookReducer, applyMiddleware(createLoggerMiddleware()))

store.dispatch({ type: "BOOK", payload: { name: 'xx' } })
