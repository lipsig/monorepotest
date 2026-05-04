import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserService from "../services/UserService";
import UserForm from "../components/UserForm";

const userService = new UserService();

function UserEdit() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await userService.get(userId);
        if (active) setUser(data);
      } catch (err) {
        if (active) setError("Falha ao carregar usuario");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [userId]);

  async function handleSubmit(payload) {
    await userService.update(userId, payload);
    navigate("/users");
  }

  return (
    <div style={{ maxWidth: 480, margin: "40px auto", fontFamily: "sans-serif" }}>
      <Link to="/users">&larr; Voltar</Link>
      <h1>Editar usuario</h1>
      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {user && (
        <UserForm
          initial={user}
          submitLabel="Salvar"
          onSubmit={handleSubmit}
          requirePassword={false}
        />
      )}
    </div>
  );
}

export default UserEdit;
