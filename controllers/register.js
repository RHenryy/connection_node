import UserModel from "../models/Users.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

export function registerPage(req, res) {
  res.render("register");
}
export async function register(req, res) {
  // Traitement des erreurs

  let checkLength = req.body.password.length >= 8;
  let checkPasswords = req.body.password === req.body.password_confirm;
  const checkUser = await UserModel.findOne({
    email: req.body.email,
  });
  if (!checkLength) {
    req.session.flashMessages.push({
      message: "Password must be at least 8 characters long!",
      type: "error",
    });
  }
  if (!checkPasswords) {
    req.session.flashMessages.push({
      message: "Passwords do not match!",
      type: "error",
    });
  }
  if (checkUser) {
    req.session.flashMessages.push({
      message: "User already exists!",
      type: "error",
    });
  }

  //
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  try {
    if (!checkPasswords || !checkLength || checkUser) {
      res.redirect("/register");
    } else {
      const user = new UserModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
      });
      await user.save();
      res.redirect("/");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}
