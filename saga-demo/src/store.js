import { createStore, combineReducers, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import * as reducers from "./reducer"
import rootSaga from "./saga/rootSaga"

const sagaMiddleware = createSagaMiddleware()

const store = createStore(combineReducers(reducers), applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

export default store
