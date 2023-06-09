import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import gamesReducer from './games';
import cartItemsReducer from './cartItems';
import reviewsReducer from './reviews';
import categoryReducer from './category';

// root reducer combine all reducers together for store
const rootReducer = combineReducers({
  session: sessionReducer,
  showGames: gamesReducer,
  cart: cartItemsReducer,
  reviews: reviewsReducer,
  category: categoryReducer,
});

// enhancer for using redux-logger
let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

// store creation incudes all reducers, preloadedState and all middlewares (in our case logger and thunk)
const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer)
}

export default configureStore;