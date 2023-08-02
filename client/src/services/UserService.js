import api from '../app/api/index';

export default class UserService {
  static async fetchUsers() {
    return api.get('/users');
  }

  static async getUserInfo(userId) {
    return api.get(`/users/${userId}`);
  }
}
