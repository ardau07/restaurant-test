import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducer from './auth';
import restaurantReducer from './restaurant';
import reviewReducer from './review';

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    restaurant: restaurantReducer,
    review: reviewReducer,
  });

export default createRootReducer;
