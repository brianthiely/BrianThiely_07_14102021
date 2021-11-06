import axios from 'axios';
import authHeader from './auth-header';
let user = JSON.parse(localStorage.getItem('user'));

const API_URL = 'http://localhost:3000/groupomania';

class UserService {
  createPost() {
    return axios.get(API_URL + '/post/create', { headers: authHeader() });
  }

  getAllPosts() {
    return axios.get(API_URL + '/posts', { headers: authHeader() });
  }

  getAllUsers() {
    return axios.get(API_URL + '/users', { headers: authHeader() })
  }

  getUser() {
    return axios.get(API_URL + '/user/profile/' + user.id, { headers: authHeader() })
  }
}

export default new UserService();