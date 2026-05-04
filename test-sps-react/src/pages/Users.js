import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import AuthService from "../services/AuthService";

const userService = new UserService();

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  function handleLogout() {
    AuthService.signOut();
    navigate("/login");
  }

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", fontFamily: "sans-serif" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Usuarios</h1>
        <div>
          <Link to="/users/new" style={{ marginRight: 12 }}>
            <button>Novo usuario</button>
          </Link>
          <button onClick={handleLogout}>Sair</button>
        </div>
      </header>
      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: 8 }}>
                Nome
              </th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: 8 }}>
                Email
              </th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: 8 }}>
                Tipo
              </th>
              <th style={{ borderBottom: "1px solid #ccc", padding: 8 }}></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={{ padding: 8 }}>{user.name}</td>
                <td style={{ padding: 8 }}>{user.email}</td>
                <td style={{ padding: 8 }}>{user.type}</td>
                <td style={{ padding: 8, textAlign: "right" }}>
                  <Link to={`/users/${user.id}`} style={{ marginRight: 8 }}>
                    <button>Editar</button>
                  </Link>
                  <button onClick={() => handleDelete(user.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Users;
