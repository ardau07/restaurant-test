import { createReducer } from '@reduxjs/toolkit';

import { requestSuccess, requestFail } from 'src/utils/api';
import { GET_REVIEWS_REQUEST } from '../types';

const initialState = {
  reviews: [],
  highest: null,
  lowest: null,
  totalCount: 0,
  status: 'INIT',
  error: null,
};

export default createReducer(initialState, {
  [requestSuccess(GET_REVIEWS_REQUEST)]: (state, { payload }) => ({
    ...state,
    reviews: payload.reviews,
    highest: payload.highest,
    lowest: payload.lowest,
    totalCount: payload.totalCount,
    status: requestSuccess(GET_REVIEWS_REQUEST),
  }),

  [requestFail(GET_REVIEWS_REQUEST)]: (state, { payload }) => ({
    ...state,
    reviews: [],
    error: payload?.error,
    status: requestFail(GET_REVIEWS_REQUEST),
  }),
});
