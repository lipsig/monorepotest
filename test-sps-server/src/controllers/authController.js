const jwt = require("jsonwebtoken");
const usersRepository = require("../repositories/usersRepository");

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const TOKEN_EXPIRATION = "8h";

function login(req, res) {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: "email e password sao obrigatorios" });
  }

  const user = usersRepository.findByEmail(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: "credenciais invalidas" });
  }

  const token = jwt.sign(
    { sub: user.id, email: user.email, type: user.type },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRATION }
  );

  return res.json({ token });
}

module.exports = { login };
