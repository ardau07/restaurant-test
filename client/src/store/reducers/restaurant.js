import { createReducer } from '@reduxjs/toolkit';

import { requestSuccess, requestFail } from 'src/utils/api';
import { CREATE_RESTAURANT_REQUEST, GET_RESTAURANTS_REQUEST } from '../types';

const initialState = {
  restaurants: [],
  totalCount: 0,
  status: 'INIT',
  error: null,
};

export default createReducer(initialState, {
  [requestSuccess(GET_RESTAURANTS_REQUEST)]: (state, { payload }) => ({
    ...state,
    restaurants: payload.restaurants,
    totalCount: payload.totalCount,
    status: requestSuccess(GET_RESTAURANTS_REQUEST),
  }),

  [requestFail(GET_RESTAURANTS_REQUEST)]: (state, { payload }) => ({
    ...state,
    restaurants: [],
    error: payload?.error,
    status: requestFail(GET_RESTAURANTS_REQUEST),
  }),

  [requestSuccess(CREATE_RESTAURANT_REQUEST)]: (state, { payload }) => ({
    ...state,
    totalCount: payload.totalCount + 1,
    status: requestSuccess(CREATE_RESTAURANT_REQUEST),
  }),

  [requestFail(CREATE_RESTAURANT_REQUEST)]: (state, { payload }) => ({
    ...state,
    error: payload?.error,
    status: requestFail(CREATE_RESTAURANT_REQUEST),
  }),
});
