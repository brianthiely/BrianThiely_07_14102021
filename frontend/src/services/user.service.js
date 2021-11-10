import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:3000/groupomania';

class UserService {
  createPost() {
    return axios.post(API_URL + '/post/create', { headers: authHeader() });
  }
  getAllPosts() {
    return axios.get(API_URL + '/posts', { headers: authHeader() });
  }
  getPostsUser(id) {
    return axios.get(API_URL + '/post/' + id, { headers: authHeader() })
  }

  deletePost(id) {
    return axios.delete(API_URL + '/post/delete/' + id, { headers: authHeader() })
  }

  getAllUsers() {
    return axios.get(API_URL + '/users', { headers: authHeader() })
  }
  getUser(id) {
    return axios.get(API_URL + '/user/profile/' + id, { headers: authHeader() })
  }
  deleteAccount(id) {
    return axios.delete(API_URL + '/user/delete/' + id, { headers: authHeader() })
  }
}

export default new UserService();