import { mongoose, Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String, min: [6, "Must be at least 6 characters"] },
});

const User = mongoose.model("User", userSchema);

export default User;
