const { Router } = require("express");
const authController = require("./controllers/authController");
const authMiddleware = require("./middlewares/authMiddleware");

const routes = Router();

routes.get("/", (req, res) => {
  res.send("Hello World!");
});

routes.post("/auth/login", authController.login);

routes.use("/users", authMiddleware);

module.exports = routes;
