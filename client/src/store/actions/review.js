import reviewService from 'src/services/reviewService';
import { requestFail, requestPending, requestSuccess } from 'src/utils/api';
import { GET_REVIEWS_REQUEST } from '../types';

export function getReviews(restaurantId, offset, limit) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(GET_REVIEWS_REQUEST) });

      const { reviews, totalCount, highest, lowest } = await reviewService.getReviews(
        restaurantId,
        offset,
        limit
      );

      dispatch({
        type: requestSuccess(GET_REVIEWS_REQUEST),
        payload: { reviews, totalCount, highest, lowest },
      });
    } catch (error) {
      dispatch({
        type: requestFail(GET_REVIEWS_REQUEST),
        payload: error?.response?.data,
      });
    }
  };
}
