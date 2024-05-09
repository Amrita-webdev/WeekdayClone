import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware  from 'redux-saga'
import reducer from './reducer'
import rootSaga from './sagas'

const rootReducer = combineReducers({
    jobs: reducer
})

//Saga Middleware
const sagaMiddleWare = createSagaMiddleware()

//Root saga function to run all sagas

const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare))
sagaMiddleWare.run(rootSaga)

export default store