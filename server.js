import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import route from "./routes/routes.js";
import session from "express-session";
// ==========
// App initialization
// ==========

dotenv.config();
const {
  APP_HOSTNAME,
  APP_PORT,
  NODE_ENV,
  MONGO_URI,
  MONGO_DB_NAME,
  SECRET_KEY,
} = process.env;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.set("view engine", "pug");
app.locals.pretty = NODE_ENV !== "production"; // Indente correctement le HTML envoyé au client (utile en dev, mais inutile en production)

// ==========
// App middlewares
// ==========
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.locals.user = req.session.user; // Assuming you store user data in req.session.user
  req.session.flashMessages = req.session.flashMessages || [];
  res.locals.flashMessages = req.session.flashMessages;
  // Clear flash messages from the session
  req.session.flashMessages = [];
  delete req.session.flashMessage;
  delete req.session.flashMessageType;
  next();
});
// ==========
// App routers
// ==========

app.use("/", route);

// ==========
// App start
// ==========
try {
  await mongoose.connect(`${MONGO_URI}${MONGO_DB_NAME}`);
  console.log("✔️ Connexion à MongoDB réussie");
} catch (err) {
  console.error("Erreur de connexion", err.message);
}
app.listen(APP_PORT, () => {
  console.log(`App listening at http://${APP_HOSTNAME}:${APP_PORT}`);
});
