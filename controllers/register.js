import UserModel from "../models/Users.js";
import bcrypt from "bcrypt";
const saltRounds = 10;
export default async function register(req, res) {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  try {
    const user = new UserModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    res.redirect("/");
  } catch (err) {
    res.status(500).send(err.message);
  }
}
