import { createReducer } from '@reduxjs/toolkit';

import { requestSuccess, requestFail } from 'src/utils/api';
import {
  GET_PROFILE_REQUEST,
  UPDATE_PROFILE_REQUEST,
  DELETE_PROFILE_REQUEST,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  SIGNUP_REQUEST,
} from '../types';

const initialState = {
  user: null,
  status: 'INIT',
  error: null,
};

export default createReducer(initialState, {
  [requestSuccess(LOGIN_REQUEST)]: (state, { payload }) => ({
    ...state,
    user: payload.user,
    status: requestSuccess(LOGIN_REQUEST),
  }),

  [requestFail(LOGIN_REQUEST)]: (state, { payload }) => ({
    ...state,
    user: null,
    error: payload.error,
    status: requestFail(LOGIN_REQUEST),
  }),

  [requestSuccess(SIGNUP_REQUEST)]: (state, { payload }) => ({
    ...state,
    user: payload.user,
    status: requestSuccess(SIGNUP_REQUEST),
  }),

  [requestFail(SIGNUP_REQUEST)]: (state, { payload }) => ({
    ...state,
    user: null,
    error: payload.error,
    status: requestFail(SIGNUP_REQUEST),
  }),

  [requestSuccess(GET_PROFILE_REQUEST)]: (state, { payload }) => ({
    ...state,
    user: payload.user,
    status: requestSuccess(GET_PROFILE_REQUEST),
  }),

  [requestFail(GET_PROFILE_REQUEST)]: (state, { payload }) => ({
    ...state,
    user: null,
    error: payload.error,
    status: requestFail(GET_PROFILE_REQUEST),
  }),

  [requestSuccess(UPDATE_PROFILE_REQUEST)]: (state, { payload }) => ({
    ...state,
    user: payload.user,
    status: requestSuccess(UPDATE_PROFILE_REQUEST),
  }),

  [requestFail(UPDATE_PROFILE_REQUEST)]: (state, { payload }) => ({
    ...state,
    error: payload.error,
    status: requestFail(UPDATE_PROFILE_REQUEST),
  }),

  [requestSuccess(DELETE_PROFILE_REQUEST)]: (state, { payload }) => ({
    ...state,
    user: null,
    error: null,
    status: requestSuccess(DELETE_PROFILE_REQUEST),
  }),

  [requestFail(DELETE_PROFILE_REQUEST)]: (state, { payload }) => ({
    ...state,
    error: payload.error,
    status: requestFail(DELETE_PROFILE_REQUEST),
  }),

  [LOGOUT_REQUEST]: (state) => ({
    ...state,
    me: null,
    error: null,
    status: LOGOUT_REQUEST,
  }),
});
