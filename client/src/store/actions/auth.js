import { push } from 'connected-react-router';

import authService from 'src/services/authService';
import { requestFail, requestPending, requestSuccess } from 'src/utils/api';
import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  SIGNUP_REQUEST,
  GET_PROFILE_REQUEST,
  UPDATE_PROFILE_REQUEST,
  DELETE_PROFILE_REQUEST,
} from '../types';

export function login(data) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(LOGIN_REQUEST) });

      const { user, token } = await authService.login(data);

      localStorage.setItem('token', token);
      dispatch({
        type: requestSuccess(LOGIN_REQUEST),
        payload: {
          user,
        },
      });
      dispatch(push('/home'));
    } catch (error) {
      dispatch({
        type: requestFail(LOGIN_REQUEST),
        payload: error?.response?.data,
      });
    }
  };
}

export function signup(data) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(SIGNUP_REQUEST) });

      const { user, token } = await authService.signup(data);

      localStorage.setItem('token', token);
      dispatch({
        type: requestSuccess(SIGNUP_REQUEST),
        payload: {
          user,
        },
      });
      dispatch(push('/home'));
    } catch (error) {
      dispatch({
        type: requestFail(SIGNUP_REQUEST),
        payload: error?.response?.data,
      });
    }
  };
}

export function getProfile() {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(GET_PROFILE_REQUEST) });

      const { user } = await authService.getProfile();
      dispatch({
        type: requestSuccess(GET_PROFILE_REQUEST),
        payload: {
          user,
        },
      });
      dispatch(push('/home'));
    } catch (error) {
      dispatch({
        type: requestFail(GET_PROFILE_REQUEST),
        payload: error?.response?.data,
      });
    }
  };
}

export function updateProfile(data, successCB, failedCB) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(UPDATE_PROFILE_REQUEST) });

      const { user } = await authService.updateProfile(data);
      dispatch({
        type: requestSuccess(UPDATE_PROFILE_REQUEST),
        payload: {
          user,
        },
      });
      successCB && successCB();
    } catch (error) {
      dispatch({
        type: requestFail(UPDATE_PROFILE_REQUEST),
        payload: error.response.data,
      });
      failedCB && failedCB();
    }
  };
}

export function deleteProfile(successCB, failedCB) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(DELETE_PROFILE_REQUEST) });

      const { user } = await authService.deleteProfile();
      dispatch({
        type: requestSuccess(DELETE_PROFILE_REQUEST),
        payload: {
          user,
        },
      });
      successCB();
      localStorage.clear();
      dispatch(push('/login'));
    } catch (error) {
      dispatch({
        type: requestFail(DELETE_PROFILE_REQUEST),
        payload: error.response.data,
      });
      failedCB();
    }
  };
}

export function logout() {
  return (dispatch) => {
    localStorage.clear();
    dispatch({ type: LOGOUT_REQUEST });
    dispatch(push('/login'));
  };
}
