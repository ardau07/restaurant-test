import userService from 'src/services/userService';
import { requestFail, requestPending, requestSuccess } from 'src/utils/api';
import {
  GET_USERS_REQUEST,
  UPDATE_USER_REQUEST,
  DELETE_USER_REQUEST,
  ADD_USER_REQUEST,
} from '../types';

export function getUsers(offset, limit) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(GET_USERS_REQUEST) });

      const { users, totalCount } = await userService.getUsers(offset, limit);

      dispatch({
        type: requestSuccess(GET_USERS_REQUEST),
        payload: { users, totalCount },
      });
    } catch (error) {
      dispatch({
        type: requestFail(GET_USERS_REQUEST),
        payload: error.response.data,
      });
    }
  };
}

export function addUser(data, successCB, failedCB) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(ADD_USER_REQUEST) });

      const { user } = await userService.addUser(data);

      dispatch({
        type: requestSuccess(ADD_USER_REQUEST),
        payload: { user },
      });
      successCB && successCB();
    } catch (error) {
      dispatch({
        type: requestFail(ADD_USER_REQUEST),
        payload: error.response.data,
      });
      failedCB && failedCB();
    }
  };
}

export function updateUser(id, data, successCB, failedCB) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(UPDATE_USER_REQUEST) });

      const { user } = await userService.updateUser(id, data);

      dispatch({
        type: requestSuccess(UPDATE_USER_REQUEST),
        payload: { user },
      });
      successCB && successCB();
    } catch (error) {
      dispatch({
        type: requestFail(UPDATE_USER_REQUEST),
        payload: error.response.data,
      });
      failedCB && failedCB();
    }
  };
}

export function deleteUser(id, successCB, failedCB) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(DELETE_USER_REQUEST) });

      await userService.deleteUser(id);

      dispatch({
        type: requestSuccess(DELETE_USER_REQUEST),
        payload: { id },
      });
      successCB && successCB();
    } catch (error) {
      dispatch({
        type: requestFail(DELETE_USER_REQUEST),
        payload: error.response.data,
      });
      failedCB && failedCB();
    }
  };
}
