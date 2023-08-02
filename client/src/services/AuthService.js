import api from '../app/api/index';

export default class AuthService {
  static async login(email, password) {
    return api.post('/auth/login', { email, password });
  }

  static async register(email, password, firstName, lastName, birthDate) {
    return api.post('/auth/registration', {
      email,
      password,
      firstName,
      lastName,
      birthDate
    });
  }

  static async logout() {
    return api.post('/auth/logout');
  }
}
