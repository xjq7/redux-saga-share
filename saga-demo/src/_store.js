import { createStore, combineReducers, applyMiddleware } from "redux"
import createSagaMiddleware from "./_saga/middleware"
import * as reducers from "./reducer"
import { sagaGetUser } from "./saga/_user"

const sagaMiddleware = createSagaMiddleware()

const store = createStore(combineReducers(reducers), applyMiddleware(sagaMiddleware))

sagaMiddleware.run(sagaGetUser)

export default store
