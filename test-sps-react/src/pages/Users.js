import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/UserService";
import AppLayout from "../components/AppLayout";

const userService = new UserService();

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await userService.list();
        if (active) setUsers(data);
      } catch (err) {
        if (active) setError("Falha ao carregar usuarios");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Excluir este usuario?")) return;
    try {
      await userService.delete(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      alert("Falha ao excluir usuario");
    }
  }

  return (
    <AppLayout>
      <div className="page-card">
        <div className="page-toolbar">
          <h2>Usuarios</h2>
          <Link to="/users/new">
            <button className="btn btn-primary">Novo usuario</button>
          </Link>
        </div>
        {loading && <p className="empty-state">Carregando...</p>}
        {error && <div className="form-error">{error}</div>}
        {!loading && !error && users.length === 0 && (
          <p className="empty-state">Nenhum usuario cadastrado.</p>
        )}
        {!loading && !error && users.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Tipo</th>
                <th className="actions">Acoes</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`badge ${user.type === "admin" ? "badge-admin" : ""}`}
                    >
                      {user.type}
                    </span>
                  </td>
                  <td className="actions">
                    <div className="actions-row">
                      <Link to={`/users/${user.id}`}>
                        <button className="btn btn-secondary">Editar</button>
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(user.id)}
                        disabled={user.email === "admin@spsgroup.com.br"}
                        title={
                          user.email === "admin@spsgroup.com.br"
                            ? "Nao e possivel excluir o admin"
                            : ""
                        }
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AppLayout>
  );
}

export default Users;
