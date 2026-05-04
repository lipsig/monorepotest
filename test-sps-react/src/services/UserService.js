import api from "./api";

class UserService {
  async list() {
    const { data } = await api.get("/users");
    return data;
  }
  async get(id) {
    const { data } = await api.get(`/users/${id}`);
    return data;
  }
  async create(payload) {
    const { data } = await api.post("/users", payload);
    return data;
  }
  async delete(id) {
    await api.delete(`/users/${id}`);
  }
  async update(id, payload) {
    const { data } = await api.put(`/users/${id}`, payload);
    return data;
  }
}

export default UserService;
