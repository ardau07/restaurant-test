import axios from 'src/utils/axios';

const baseURL = '/api/restaurants';

class RestaurantService {
  getRestaurants = async (offset, limit, params) => {
    try {
      const response = await axios.get(`${baseURL}`, {
        params: {
          ...params,
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
}

const restaurantService = new RestaurantService();

export default restaurantService;
