import axios from 'axios';

const API_URL = 'http://localhost:3000/groupomania';

class AuthService {
  async login(user) {
    const response = await axios
          .post(API_URL + '/login', {
              email: user.email,
              password: user.password
          });
      if (response.data.tokenConnection) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + '/signup', {
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  }
}

export default new AuthService();