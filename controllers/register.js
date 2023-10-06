import e from "express";
import UserModel from "../models/Users.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

export function registerPage(req, res) {
  res.render("register");
}
export async function register(req, res) {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  try {
    const checkUser = await UserModel.findOne({
      email: req.body.email,
    });
    if (!checkUser) {
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
