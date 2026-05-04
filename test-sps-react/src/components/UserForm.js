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
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block" }}>Nome</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: "100%", padding: 6 }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block" }}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: 6 }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block" }}>Tipo</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{ width: "100%", padding: 6 }}
        >
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block" }}>
          Senha {!requirePassword && "(deixe em branco para manter)"}
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={requirePassword}
          style={{ width: "100%", padding: 6 }}
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" disabled={submitting} style={{ padding: "8px 16px" }}>
        {submitting ? "Salvando..." : submitLabel}
      </button>
    </form>
  );
}

export default UserForm;
