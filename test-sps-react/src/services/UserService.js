import api from "./api";

class UserService {
  async list() {
    const { data } = await api.get("/users");
    return data;
  }
  async get(id) {
    throw new Error("Not implemented");
  }
  async create(data) {
    throw new Error("Not implemented");
  }
  async delete(id) {
    throw new Error("Not implemented");
  }
  async update(id, data) {
    throw new Error("Not implemented");
  }
}

export default UserService;
