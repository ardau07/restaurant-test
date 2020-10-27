import axios from 'src/utils/axios';

const baseURL = '/api/auth';

class AuthService {
  login = async (payload) => {
    try {
      const response = await axios.post(`${baseURL}/login`, payload);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  signup = async (payload) => {
    try {
      const response = await axios.post(`${baseURL}/signup`, payload);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };
}

const authService = new AuthService();

export default authService;
