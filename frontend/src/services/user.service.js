import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/groupomania';

class UserService {
  createPost() {
    return axios.get(API_URL + '/post/create', { headers: authHeader() });
  }

  getAllPosts() {
    return axios.get(API_URL + '/posts', { headers: authHeader() });
  }
}

export default new UserService();