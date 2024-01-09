import { mongoose, Schema } from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String, min: [6, "Must be at least 6 characters"] },
});

userSchema.methods.crypto = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const User = mongoose.model("User", userSchema);

export default User;
