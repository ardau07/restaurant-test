import { createReducer } from '@reduxjs/toolkit';

import { requestSuccess, requestFail } from 'src/utils/api';
import {
  CREATE_REVIEW_REQUEST,
  GET_REVIEWS_REQUEST,
  SET_REVIEW,
  DELETE_REVIEW_REQUEST,
  UPDATE_REVIEW_REQUEST,
} from '../types';

const initialState = {
  reviews: [],
  review: {},
  average: null,
  highest: null,
  lowest: null,
  canReply: false,
  totalCount: 0,
  status: 'INIT',
  error: null,
};

export default createReducer(initialState, {
  [requestSuccess(GET_REVIEWS_REQUEST)]: (state, { payload }) => ({
    ...state,
    reviews: payload.reviews,
    average: payload.average,
    highest: payload.highest,
    lowest: payload.lowest,
    canReply: payload.canReply,
    totalCount: payload.totalCount,
    status: requestSuccess(GET_REVIEWS_REQUEST),
  }),

  [requestFail(GET_REVIEWS_REQUEST)]: (state, { payload }) => ({
    ...state,
    reviews: [],
    average: null,
    highest: null,
    lowest: null,
    canReply: false,
    totalCount: 0,
    error: payload?.error,
    status: requestFail(GET_REVIEWS_REQUEST),
  }),

  [requestSuccess(CREATE_REVIEW_REQUEST)]: (state, { payload }) => ({
    ...state,
    totalCount: state.totalCount + 1,
    canReply: false,
    status: requestSuccess(CREATE_REVIEW_REQUEST),
  }),

  [requestFail(CREATE_REVIEW_REQUEST)]: (state, { payload }) => ({
    ...state,
    error: payload?.error,
    status: requestFail(CREATE_REVIEW_REQUEST),
  }),

  [requestSuccess(UPDATE_REVIEW_REQUEST)]: (state, { payload }) => ({
    ...state,
    review: payload.review,
    status: requestSuccess(UPDATE_REVIEW_REQUEST),
  }),

  [requestSuccess(UPDATE_REVIEW_REQUEST)]: (state, { payload }) => ({
    ...state,
    review: {},
    error: payload?.error,
    status: requestFail(UPDATE_REVIEW_REQUEST),
  }),

  [requestSuccess(DELETE_REVIEW_REQUEST)]: (state, { payload }) => {
    const filteredItem = state.reviews.filter((review) => review.id === payload.reviewId);
    state.reviews = filteredItem;
    state.status = requestSuccess(DELETE_REVIEW_REQUEST);
  },

  [requestFail(DELETE_REVIEW_REQUEST)]: (state, { payload }) => ({
    ...state,
    review: {},
    error: payload?.error,
    status: requestFail(DELETE_REVIEW_REQUEST),
  }),

  [SET_REVIEW]: (state, { payload }) => ({
    ...state,
    review: payload.review,
    status: SET_REVIEW,
  }),
});
