import { push } from 'connected-react-router';

import authService from 'src/services/authService';
import { requestFail, requestPending, requestSuccess } from 'src/utils/api';
import { LOGIN_REQUEST, SIGNUP_REQUEST } from '../types';

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
        payload: error.response.data,
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
        payload: error.response.data,
      });
    }
  };
}
