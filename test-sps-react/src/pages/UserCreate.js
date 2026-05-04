import React from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import UserForm from "../components/UserForm";
import AppLayout from "../components/AppLayout";

const userService = new UserService();

function UserCreate() {
  const navigate = useNavigate();

  async function handleSubmit(payload) {
    await userService.create(payload);
    navigate("/users");
  }

  return (
    <AppLayout>
      <div className="page-card">
        <Link to="/users" className="back-link">
          &larr; Voltar
        </Link>
        <h2>Novo usuario</h2>
        <p className="subtitle">Preencha os dados abaixo para cadastrar.</p>
        <UserForm submitLabel="Criar" onSubmit={handleSubmit} requirePassword />
      </div>
    </AppLayout>
  );
}

export default UserCreate;
