import { createReducer } from '@reduxjs/toolkit';

import { requestSuccess, requestFail } from 'src/utils/api';
import {
  ADD_USER_REQUEST,
  GET_USERS_REQUEST,
  DELETE_USER_REQUEST,
  UPDATE_USER_REQUEST,
  SET_USER,
} from '../types';

const initialState = {
  users: [],
  user: {},
  totalCount: 0,
  status: 'INIT',
  error: null,
};

export default createReducer(initialState, {
  [requestSuccess(GET_USERS_REQUEST)]: (state, { payload }) => ({
    ...state,
    users: payload.users,
    totalCount: payload.totalCount,
    status: requestSuccess(GET_USERS_REQUEST),
  }),

  [requestFail(GET_USERS_REQUEST)]: (state, { payload }) => ({
    ...state,
    users: [],
    error: payload?.error,
    status: requestFail(GET_USERS_REQUEST),
  }),

  [requestSuccess(ADD_USER_REQUEST)]: (state, { payload }) => ({
    ...state,
    user: payload.user,
    status: requestSuccess(ADD_USER_REQUEST),
  }),

  [requestFail(ADD_USER_REQUEST)]: (state) => ({
    ...state,
    user: {},
    status: requestFail(ADD_USER_REQUEST),
  }),

  [requestSuccess(UPDATE_USER_REQUEST)]: (state, { payload }) => {
    const index = state.users.findIndex((user) => user.id === payload.user.id);
    if (index < 0) return;
    state.users[index] = payload.user;
    state.status = requestSuccess(UPDATE_USER_REQUEST);
  },

  [requestFail(UPDATE_USER_REQUEST)]: (state, { payload }) => ({
    ...state,
    user: {},
    error: payload.error,
    status: requestFail(UPDATE_USER_REQUEST),
  }),

  [requestSuccess(DELETE_USER_REQUEST)]: (state, { payload }) => {
    const filteredUsers = state.users.filter((user) => user.id === payload.id);
    state.users = filteredUsers;
    state.status = requestSuccess(DELETE_USER_REQUEST);
  },

  [requestFail(DELETE_USER_REQUEST)]: (state, { payload }) => ({
    ...state,
    user: {},
    error: payload.error,
    status: requestFail(DELETE_USER_REQUEST),
  }),

  [SET_USER]: (state, { payload }) => ({
    ...state,
    user: payload.user,
    status: SET_USER,
  }),
});
