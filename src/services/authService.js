const BASE_URL = "http://localhost:9001/api";
import axios from "axios";

export default class AuthService {
  static LOGIN_URL = `${BASE_URL}/auth/login`;
  static REGISTER_URL = `${BASE_URL}/auth/register`;
  static LOGOUT_URL = `${BASE_URL}/auth/logout`;
  static FORGOT_PASSWORD_URL = `${BASE_URL}/auth/forgot-password`;

  static async login(payload) {
    const response = await axios.post(`${this.LOGIN_URL}`, payload);
    return response;
  }

  static async register(payload) {
    const response = await axios.post(`${this.REGISTER_URL}`, payload);
    return response.data;
  }

  static async logout() {
    const response = await axios.get(`${this.LOGOUT_URL}`);
    return response.data;
  }

  static async forgotPassword(payload) {
    const response = await axios.post(`${this.FORGOT_PASSWORD_URL}`, payload);
    return response.data;
  }
}
