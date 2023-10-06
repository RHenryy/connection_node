import UserModel from "../models/Users.js";

export default async function users(req, res) {
  try {
    const update = {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        role: req.body.role,
      },
    };
    const result = await UserModel.updateOne(
      { _id: res.locals.user._id },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        role: req.body.role,
      }
    );
    if (result) {
      req.session.flashMessages.push({
        message: "User successfully updated",
        type: "success",
      });
      res.redirect("/dashboard");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}
