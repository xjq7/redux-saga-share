import { createStore, combineReducers, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import * as reducers from "./reducer"
import rootSaga from "./saga/rootSaga"
import { sagaGetUser } from "./saga/user"

const sagaMiddleware = createSagaMiddleware()

const store = createStore(combineReducers(reducers), applyMiddleware(sagaMiddleware))

sagaMiddleware.run(sagaGetUser)

export default store
