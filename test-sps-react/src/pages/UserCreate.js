import React from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import UserForm from "../components/UserForm";

const userService = new UserService();

function UserCreate() {
  const navigate = useNavigate();

  async function handleSubmit(payload) {
    await userService.create(payload);
    navigate("/users");
  }

  return (
    <div style={{ maxWidth: 480, margin: "40px auto", fontFamily: "sans-serif" }}>
      <Link to="/users">&larr; Voltar</Link>
      <h1>Novo usuario</h1>
      <UserForm submitLabel="Criar" onSubmit={handleSubmit} requirePassword />
    </div>
  );
}

export default UserCreate;
