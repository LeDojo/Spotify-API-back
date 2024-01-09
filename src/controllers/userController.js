import User from "../models/userModel";

const saveUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    console.error(error);
  }
};

export { saveUser };
