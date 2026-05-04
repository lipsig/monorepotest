import React from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

function AppLayout({ children }) {
  const navigate = useNavigate();

  function handleLogout() {
    AuthService.signOut();
    navigate("/login");
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>SPS Users</h1>
        <button className="btn btn-secondary" onClick={handleLogout}>
          Sair
        </button>
      </header>
      <main className="app-content">{children}</main>
    </div>
  );
}

export default AppLayout;
