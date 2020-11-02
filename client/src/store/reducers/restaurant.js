import { createReducer } from '@reduxjs/toolkit';

import { requestSuccess, requestFail } from 'src/utils/api';
import {
  CREATE_RESTAURANT_REQUEST,
  GET_RESTAURANTS_REQUEST,
  SET_RESTAURANT,
  DELETE_RESTAURANT_REQUEST,
  UPDATE_RESTAURANT_REQUEST,
} from '../types';

const initialState = {
  restaurants: [],
  restaurant: {},
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

  [requestSuccess(UPDATE_RESTAURANT_REQUEST)]: (state, { payload }) => {
    const index = state.restaurants.findIndex(
      (restaurant) => restaurant.id === payload.restaurant.id
    );
    if (index < 0) return;
    state.restaurants[index] = payload.restaurant;
    state.restaurant = payload.restaurant;
    state.status = requestSuccess(UPDATE_RESTAURANT_REQUEST);
  },

  [requestFail(UPDATE_RESTAURANT_REQUEST)]: (state, { payload }) => ({
    ...state,
    restaurant: {},
    error: payload?.error,
    status: requestFail(UPDATE_RESTAURANT_REQUEST),
  }),

  [requestSuccess(DELETE_RESTAURANT_REQUEST)]: (state, { payload }) => {
    const filteredItem = state.restaurants.filter(
      (restaurant) => restaurant.id === payload.restaurantId
    );
    state.restaurants = filteredItem;
    state.status = requestSuccess(DELETE_RESTAURANT_REQUEST);
  },

  [requestFail(DELETE_RESTAURANT_REQUEST)]: (state, { payload }) => ({
    ...state,
    restaurant: {},
    error: payload?.error,
    status: requestFail(DELETE_RESTAURANT_REQUEST),
  }),

  [SET_RESTAURANT]: (state, { payload }) => ({
    ...state,
    restaurant: payload.restaurant,
    status: SET_RESTAURANT,
  }),
});
