import { apiClient } from "./database";

export default class UserService {
  static async getUser(id: number) {
    const response = await apiClient.get("api/users", {
      params: {
        id
      }
    });
    return response.data;
  }

  static async getAllUsers() {
    const response = await apiClient.get("api/users");
    return response.data;
  }

  static async Login(email: string, password: string) {
    const response = await apiClient.post("api/login", {
      email: email,
      password: password
    });
    return response.data;
  }

  static async Register(email: string, password: string, code: string) {
    const response = await apiClient.post("api/register", {
      email: email,
      password: password,
      code: code
    });
    return response.data;
  }

  static async Logout() {}
}
