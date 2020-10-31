import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducer from './auth';
import restaurantReducer from './restaurant';
import reviewReducer from './review';
import userReducer from './user';

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    restaurant: restaurantReducer,
    review: reviewReducer,
    user: userReducer,
  });

export default createRootReducer;
