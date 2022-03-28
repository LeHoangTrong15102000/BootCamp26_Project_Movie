import { createStore, compose , applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'
import reducer from './reducer'

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;


const middlewares = applyMiddleware(ReduxThunk)
const enhancer = composeEnhancers(middlewares)

const store = createStore(reducer , enhancer)

export default store