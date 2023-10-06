import { Router } from "express";
import HomeController from "../controllers/home.js";
import { loginPage, login } from "../controllers/login.js";
import { registerPage, register } from "../controllers/register.js";
import disconnectController from "../controllers/disconnect.js";
import dashboardController from "../controllers/dashboard.js";
import userRoleController from "../controllers/userRole.js";
const appRouter = Router();
function isAuthenticated(req, res, next) {
  // Check if user is authenticated
  if (req.session && req.session.user) {
    // User is authenticated, allow access to the next middleware or route handler
    next();
  } else {
    // User is not authenticated, redirect to login page or send an unauthorized response
    req.session.flashMessages.push({
      message: "You must be logged in to access this page",
      type: "error",
    });
    res.redirect("/login"); // You can customize the redirect URL
    // Or send an unauthorized response: res.status(401).send('Unauthorized');
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
//dashboard
appRouter.get("/dashboard", isAuthenticated, dashboardController);
//User roles
appRouter.post("/userRole", userRoleController);
export default appRouter;
