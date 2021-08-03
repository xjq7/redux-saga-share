import { createStore, applyMiddlewares } from "./redux-middlewares.mjs"
import createLoggerMiddleware from "../middleware/redux-logger.mjs"
import createFakeLoggerMiddleware from "../middleware/redux-logger-fake.mjs"

const store = createStore(bookReducer, applyMiddlewares([createLoggerMiddleware(), createFakeLoggerMiddleware()]))

function bookAction (payload) {
  return { type: "BOOK", payload }
}

function bookReducer (state = {}, action) {
  switch (action.type) {
    case "BOOK":
      return { ...state, ...action.payload }
  }
}

// console.log("dispatch start------  my store state=", store.getState(), '\n')
store.dispatch(bookAction({ name: "提问的艺术" }))
// console.log("dispatch end------  my store state=", store.getState(), '\n')



// function mid1(){}

// function mid2(){}

// function mid3(){}

// mid1(mid2(dispatch))

mid1()

function mid1 () {
  console.log(1);
  mid2()
  console.log(2);
}

function mid2 () {
  console.log(3);
  mid3()
  console.log(4);
}


// store dispatch
function mid3(){
  console.log(5);
}