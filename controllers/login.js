import UserModel from "../models/Users.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

export function loginPage(req, res) {
  const error = req.query.error;
  res.render("login", { error });
}
export async function login(req, res) {
  try {
    const findUser = await UserModel.findOne({
      email: req.body.email,
    });
    if (findUser) {
      const isPasswordMatch = await bcrypt.compare(
        req.body.password,
        findUser.password
      );
      if (isPasswordMatch) {
        res.redirect("/");
      } else {
        res.redirect("/login?error=invalid");
      }
    } else {
      res.redirect("/login?error=invalid");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}
