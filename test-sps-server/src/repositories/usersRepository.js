const users = [
  {
    id: 1,
    name: "admin",
    email: "admin@spsgroup.com.br",
    type: "admin",
    password: "1234",
  },
];

let nextId = 2;

function findAll() {
  return users;
}

function findById(id) {
  return users.find((u) => u.id === Number(id));
}

function findByEmail(email) {
  return users.find((u) => u.email === email);
}

function create({ name, email, type, password }) {
  const user = { id: nextId++, name, email, type, password };
  users.push(user);
  return user;
}

function update(id, patch) {
  const user = findById(id);
  if (!user) return null;
  Object.assign(user, patch);
  return user;
}

function remove(id) {
  const idx = users.findIndex((u) => u.id === Number(id));
  if (idx === -1) return false;
  users.splice(idx, 1);
  return true;
}

module.exports = { findAll, findById, findByEmail, create, update, remove };
