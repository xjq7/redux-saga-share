import { createStore } from "./redux-simple.mjs"

export function bookReducer(state = {}, action) {
  switch (action.type) {
    case "BOOK":
      return { ...state, ...action.payload }
  }
}

const store = createStore(bookReducer)

console.log("dispatch start------  my store state=", store.getState())
store.dispatch({ type: "BOOK", payload: { name: "xjq" } })
console.log("dispatch end------  my store state=", store.getState())
