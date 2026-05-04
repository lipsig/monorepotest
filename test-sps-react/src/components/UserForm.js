import React, { useEffect, useState } from "react";

function UserForm({ initial, submitLabel, onSubmit, requirePassword = true }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("user");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initial) {
      setName(initial.name || "");
      setEmail(initial.email || "");
      setType(initial.type || "user");
    }
  }, [initial]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const payload = { name, email, type };
      if (password) payload.password = password;
      await onSubmit(payload);
    } catch (err) {
      const message = err.response?.data?.error || "Falha ao salvar";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Nome</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="type">Tipo</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="password">
          Senha
          {!requirePassword && (
            <span className="form-hint">(deixe em branco para manter)</span>
          )}
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={requirePassword}
        />
      </div>
      {error && <div className="form-error">{error}</div>}
      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Salvando..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default UserForm;
