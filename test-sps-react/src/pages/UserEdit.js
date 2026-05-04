import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserService from "../services/UserService";
import UserForm from "../components/UserForm";
import AppLayout from "../components/AppLayout";

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
    <AppLayout>
      <div className="page-card">
        <Link to="/users" className="back-link">
          &larr; Voltar
        </Link>
        <h2>Editar usuario</h2>
        {loading && <p className="empty-state">Carregando...</p>}
        {error && <div className="form-error">{error}</div>}
        {user && (
          <UserForm
            initial={user}
            submitLabel="Salvar"
            onSubmit={handleSubmit}
            requirePassword={false}
          />
        )}
      </div>
    </AppLayout>
  );
}

export default UserEdit;
