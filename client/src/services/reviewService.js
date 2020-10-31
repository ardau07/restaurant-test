import axios from 'src/utils/axios';

const baseURL = '/api/restaurants';

class ReviewService {
  getReviews = async (restaurantId, offset, limit) => {
    try {
      const response = await axios.get(`${baseURL}/${restaurantId}/reviews`, {
        params: {
          offset,
          limit,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  createReview = async (restaurantId, data) => {
    try {
      const response = await axios.post(`${baseURL}/${restaurantId}/reviews`, data);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };
}

const reviewService = new ReviewService();

export default reviewService;
