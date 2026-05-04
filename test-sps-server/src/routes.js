const { Router } = require("express");
const authController = require("./controllers/authController");

const routes = Router();

routes.get("/", (req, res) => {
  res.send("Hello World!");
});

routes.post("/auth/login", authController.login);

module.exports = routes;
