const usersRepository = require("../repositories/usersRepository");

function sanitize(user) {
  if (!user) return user;
  const { password, ...rest } = user;
  return rest;
}

function list(req, res) {
  return res.json(usersRepository.findAll().map(sanitize));
}

function getById(req, res) {
  const user = usersRepository.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "usuario nao encontrado" });
  return res.json(sanitize(user));
}

function create(req, res) {
  const { email, name, type, password } = req.body || {};
  if (!email || !name || !type || !password) {
    return res
      .status(400)
      .json({ error: "email, name, type e password sao obrigatorios" });
  }
  if (usersRepository.findByEmail(email)) {
    return res.status(409).json({ error: "email ja cadastrado" });
  }
  const user = usersRepository.create({ email, name, type, password });
  return res.status(201).json(sanitize(user));
}

function update(req, res) {
  const id = Number(req.params.id);
  const existing = usersRepository.findById(id);
  if (!existing) return res.status(404).json({ error: "usuario nao encontrado" });

  const { email, name, type, password } = req.body || {};

  if (email && email !== existing.email) {
    const conflict = usersRepository.findByEmail(email);
    if (conflict && conflict.id !== id) {
      return res.status(409).json({ error: "email ja cadastrado" });
    }
  }

  const patch = {};
  if (email !== undefined) patch.email = email;
  if (name !== undefined) patch.name = name;
  if (type !== undefined) patch.type = type;
  if (password !== undefined) patch.password = password;

  const user = usersRepository.update(id, patch);
  return res.json(sanitize(user));
}

function remove(req, res) {
  const ok = usersRepository.remove(req.params.id);
  if (!ok) return res.status(404).json({ error: "usuario nao encontrado" });
  return res.status(204).send();
}

module.exports = { list, getById, create, update, remove };
