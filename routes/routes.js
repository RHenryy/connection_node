import { Router } from "express";
import HomeController from "../controllers/home.js";
import LoginController from "../controllers/login.js";
import RegisterController from "../controllers/register.js";

const appRouter = Router();

appRouter.get("/", HomeController);
appRouter.get("/login", LoginController);
appRouter.post("/registerPost", RegisterController);
appRouter.post("/registerPost", RegisterController);
export default appRouter;
