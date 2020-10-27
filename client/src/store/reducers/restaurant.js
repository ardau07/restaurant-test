import { createReducer } from '@reduxjs/toolkit';

import { requestSuccess, requestFail } from 'src/utils/api';
import { GET_RESTAURANTS_REQUEST } from '../types';

const initialState = {
  restaurants: null,
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
    restaurants: null,
    error: payload.error,
    status: requestFail(GET_RESTAURANTS_REQUEST),
  }),
});
