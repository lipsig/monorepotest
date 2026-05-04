import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const TOKEN_KEY = "sps_token";

class AuthService {
  async signIn(email, password) {
    const { data } = await axios.post(`${SERVER_URL}/auth/login`, {
      email,
      password,
    });
    localStorage.setItem(TOKEN_KEY, data.token);
    return data.token;
  }

  signOut() {
    localStorage.removeItem(TOKEN_KEY);
  }

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  isAuthenticated() {
    return Boolean(this.getToken());
  }
}

const authService = new AuthService();
export default authService;
