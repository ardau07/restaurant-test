import { createReducer } from '@reduxjs/toolkit';

import { requestSuccess, requestFail } from 'src/utils/api';
import { GET_USERS_REQUEST } from '../types';

const initialState = {
  users: [],
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
});
