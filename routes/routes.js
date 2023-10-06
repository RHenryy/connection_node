import { Router } from "express";
import HomeController from "../controllers/home.js";
import { loginPage, login } from "../controllers/login.js";
import { registerPage, register } from "../controllers/register.js";

const appRouter = Router();

//home
appRouter.get("/", HomeController);
//login
appRouter.get("/login", loginPage);
appRouter.post("/login", login);
//register
appRouter.get("/register", registerPage);
appRouter.post("/register", register);
export default appRouter;
