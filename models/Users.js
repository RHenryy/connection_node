import mongoose from "mongoose";
const User = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});
const UserModel = mongoose.model("users", User);

export default UserModel;
