import axios from 'src/utils/axios';

const baseURL = '/api/users';

class UserService {
  getUsers = async (offset, limit) => {
    try {
      const response = await axios.get(`${baseURL}`, {
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

  addUser = async (data) => {
    try {
      const response = await axios.post(`${baseURL}`, data);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  updateUser = async (userId, data) => {
    try {
      const response = await axios.put(`${baseURL}/${userId}`, data);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`${baseURL}/${userId}`);
      if (response.status >= 200 && response.status < 300) {
        return true;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };
}

const userService = new UserService();

export default userService;
