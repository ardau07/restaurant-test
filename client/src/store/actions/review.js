import reviewService from 'src/services/reviewService';
import { requestFail, requestPending, requestSuccess } from 'src/utils/api';
import { CREATE_REVIEW_REQUEST, GET_REVIEWS_REQUEST, UPDATE_REVIEW_REQUEST } from '../types';

export function getReviews(restaurantId, offset, limit) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(GET_REVIEWS_REQUEST) });

      const {
        reviews,
        totalCount,
        average,
        highest,
        lowest,
        canReply,
      } = await reviewService.getReviews(restaurantId, offset, limit);

      dispatch({
        type: requestSuccess(GET_REVIEWS_REQUEST),
        payload: { reviews, totalCount, average, highest, lowest, canReply },
      });
    } catch (error) {
      dispatch({
        type: requestFail(GET_REVIEWS_REQUEST),
        payload: error?.response?.data,
      });
    }
  };
}

export function createReview(restaurantId, data, successCB, failCB) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(CREATE_REVIEW_REQUEST) });

      const { review } = await reviewService.createReview(restaurantId, data);

      dispatch({
        type: requestSuccess(CREATE_REVIEW_REQUEST),
        payload: { review },
      });
      successCB && successCB();
    } catch (error) {
      dispatch({
        type: requestFail(CREATE_REVIEW_REQUEST),
        payload: error?.response?.data,
      });
      failCB && failCB();
    }
  };
}

export function updateReview(restaurantId, reviewId, data, successCB, failCB) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(UPDATE_REVIEW_REQUEST) });

      const { review } = await reviewService.updateReview(restaurantId, reviewId, data);

      dispatch({
        type: requestSuccess(UPDATE_REVIEW_REQUEST),
        payload: { review },
      });
      successCB && successCB();
    } catch (error) {
      dispatch({
        type: requestFail(UPDATE_REVIEW_REQUEST),
        payload: error?.response?.data,
      });
      failCB && failCB();
    }
  };
}
