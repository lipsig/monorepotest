const { Router } = require("express");
const authController = require("./controllers/authController");
const usersController = require("./controllers/usersController");
const authMiddleware = require("./middlewares/authMiddleware");

const routes = Router();

routes.post("/auth/login", authController.login);

routes.use("/users", authMiddleware);
routes.get("/users", usersController.list);
routes.get("/users/:id", usersController.getById);
routes.post("/users", usersController.create);
routes.put("/users/:id", usersController.update);
routes.delete("/users/:id", usersController.remove);

module.exports = routes;
