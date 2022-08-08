import User from "../models/User.js";

import idGenerate from "../helpers/IdGenerate.js";
import jwtGenerate from "../helpers/jwtGenerate.js";

import { emailRegisterUser, emailForgetPassword } from "../helpers/emails.js";

export const register = async (req, res) => {
  const { email } = req.body;
  const existeusuario = await User.findOne({ email });
  if (existeusuario) {
    const error = new Error("Email in use");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const user = new User(req.body);
    user.token = idGenerate();
    await user.save();

    emailRegisterUser({
      email: user.email,
      name: user.name,
      token: user.token,
    });

    res.json({
      msg: "User created, check your email to confirm your account",
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

export const authenticate = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("User don't exists");
    return res.status(400).json({ msg: error.message });
  }

  if (!user.confirmed) {
    const error = new Error("Unconfirmed user");
    return res.status(400).json({ msg: error.message });
  }

  if (!(await user.checkPassword(password))) {
    const error = new Error("Incorrect password");
    return res.status(400).json({ msg: error.message });
  }

  res.json({
    _id: user._id,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    publications: user.publications,
    admin: user.admin,
    token: jwtGenerate(user._id),
  });
};

export const confirm = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ token });
  if (!user) {
    const error = new Error("Invalid token");
    return res.status(400).json({ msg: error.message });
  }
  try {
    user.token = "";
    user.confirmed = true;
    await user.save();
    res.json({ msg: "user confirmed" });
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("User don't exists");
    return res.status(400).json({ msg: error.message });
  }
  try {
    user.token = idGenerate();
    await user.save();

    emailForgetPassword({
      email: user.email,
      name: user.name,
      token: user.token,
    });

    res.json({ msg: "Email sent" });
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
};

export const checkToken = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ token });
  if (!user) {
    const error = new Error("Invalid token");
    return res.status(400).json({ msg: error.message });
  }
  try {
    res.json({ msg: "Valid token" });
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
};

export const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({ token });
  if (user) {
    user.password = password;
    user.token = "";
    try {
      await user.save();
      return res.json({ msg: "Password modified" });
    } catch (e) {
      return res.status(400).json({ msg: e.message });
    }
  } else {
    const error = new Error("Invalid token");
    return res.status(400).json({ msg: error.message });
  }
};

export const profile = (req, res) => {
  const { user } = req;
  res.json(user);
};
