import { generateAuthToken } from "../middlewares/auth";
import User from "../models/userModel";

const saveUser = async (req, res) => {
  try {
    const newUser = await new User();
    newUser.email = req.body.email;
    newUser.password = await newUser.crypto(req.body.password);
    newUser.save();
    const token = generateAuthToken(newUser);
    res.json({ newUser, token });
  } catch (error) {
    console.error(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    const verify = await user.verifPass(password, user.password);
    if (!verify) {
      const error = new Error("Invalid Password");
      throw error;
    }
    const token = generateAuthToken(user);

    res.json({ message: "success", token });
  } catch (error) {
    res.json({ message: "error " + error });
  }
};

export { saveUser, login };
