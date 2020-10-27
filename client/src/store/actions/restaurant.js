import restaurantService from 'src/services/restaurantService';
import { requestFail, requestPending, requestSuccess } from 'src/utils/api';
import { GET_RESTAURANTS_REQUEST } from '../types';

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
