import restaurantService from 'src/services/restaurantService';
import { requestFail, requestPending, requestSuccess } from 'src/utils/api';
import {
  CREATE_RESTAURANT_REQUEST,
  GET_RESTAURANTS_REQUEST,
  UPDATE_RESTAURANT_REQUEST,
  SET_RESTAURANT,
} from '../types';

export function getRestaurants(offset, limit, params = {}) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(GET_RESTAURANTS_REQUEST) });

      const { restaurants, totalCount } = await restaurantService.getRestaurants(
        offset,
        limit,
        params
      );

      dispatch({
        type: requestSuccess(GET_RESTAURANTS_REQUEST),
        payload: { restaurants, totalCount },
      });
    } catch (error) {
      dispatch({
        type: requestFail(GET_RESTAURANTS_REQUEST),
        payload: error?.response?.data,
      });
    }
  };
}

export function createRestaurant(data, successCB, failCB) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(CREATE_RESTAURANT_REQUEST) });

      const { restaurant } = await restaurantService.createRestaurant(data);

      dispatch({
        type: requestSuccess(CREATE_RESTAURANT_REQUEST),
        payload: { restaurant },
      });
      successCB && successCB();
    } catch (error) {
      dispatch({
        type: requestFail(CREATE_RESTAURANT_REQUEST),
        payload: error?.response?.data,
      });
      failCB && failCB();
    }
  };
}

export function updateRestaurant(restaurantId, data, successCB, failCB) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(UPDATE_RESTAURANT_REQUEST) });

      const { restaurant } = await restaurantService.updateRestaurant(restaurantId, data);

      dispatch({
        type: requestSuccess(UPDATE_RESTAURANT_REQUEST),
        payload: { restaurant },
      });
      successCB && successCB();
    } catch (error) {
      console.log('error: ', error);
      dispatch({
        type: requestFail(UPDATE_RESTAURANT_REQUEST),
        payload: error?.response?.data,
      });
      failCB && failCB();
    }
  };
}

export function setRestaurant(restaurant) {
  return (dispatch) => {
    dispatch({
      type: SET_RESTAURANT,
      payload: { restaurant },
    });
  };
}
