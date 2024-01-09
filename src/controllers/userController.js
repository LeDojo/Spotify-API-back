import User from "../models/userModel";

const saveUser = async (req, res) => {
  try {
    const newUser = await new User();
    newUser.email = req.body.email;
    newUser.password = await newUser.crypto(req.body.password);
    newUser.save();
    res.json(newUser);
  } catch (error) {
    console.error(error);
  }
};

export { saveUser };
