// import UserModel from "../models/Users.js";
// import bcrypt from "bcrypt";
// const saltRounds = 10;
// export default async function users(req, res) {
//   try {
//     const users = await UserModel.find({}).sort({ category: -1 });
//     res.render("users", { users });
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// }
// export default async function addUser(req, res) {
//     try {
//         const user = new UserModel({
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             email: req.body.email,
//             password: bcrypt.genSalt(saltRounds, function(err, salt) {
//                 bcrypt.hash(req.body.password, salt, function(err, hash) {

//                 });
//             })
//         });
//         await user.save();
//         res.redirect("/users");
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// }
