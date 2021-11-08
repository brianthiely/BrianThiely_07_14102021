import axios from 'axios';
import authHeader from './auth-header';
let user = JSON.parse(localStorage.getItem('user'));

const API_URL = 'http://localhost:3000/groupomania';

class UserService {
  createPost() {
    return axios.post(API_URL + '/post/create', { headers: authHeader() });
  }
  getAllPosts() {
    return axios.get(API_URL + '/posts', { headers: authHeader() });
  }
  getPostsUser() {
    return axios.get(API_URL + '/post/' + user.id, { headers: authHeader() })
  }
  deletePost() {
    return axios.delete(API_URL + '/post/delete/' + post.id, { headers: authHeader() })
  }

  getAllUsers() {
    return axios.get(API_URL + '/users', { headers: authHeader() })
  }
  getUser() {
    return axios.get(API_URL + '/user/profile/' + user.id, { headers: authHeader() })
  }
  deleteAccount() {
    return axios.delete(API_URL + '/user/delete/' + user.id, { headers: authHeader() })
  }
}

export default new UserService();