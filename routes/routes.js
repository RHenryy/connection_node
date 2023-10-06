import { Router } from "express";
import HomeController from "../controllers/home.js";
import { loginPage, login } from "../controllers/login.js";
import { registerPage, register } from "../controllers/register.js";
import disconnectController from "../controllers/disconnect.js";
import dashboardController from "../controllers/dashboard.js";
import userRoleController from "../controllers/userRole.js";
const appRouter = Router();
// Middleware pour checker si connecté
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    req.session.flashMessages.push({
      message: "You must be logged in to access this page",
      type: "error",
    });
    res.redirect("/login");
  }
}
//home
appRouter.get("/", HomeController);
//login
appRouter.get("/login", loginPage);
appRouter.post("/login", login);
//register
appRouter.get("/register", registerPage);
appRouter.post("/register", register);
//DC
appRouter.get("/logout", disconnectController);
//dashboard - utilisation du middleware de connexion
appRouter.get("/dashboard", isAuthenticated, dashboardController);
//User roles
appRouter.post("/userRole", userRoleController);
export default appRouter;
