import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" });
};
export const login = async (req, res) => {
  const {email,password} = req.body;
  try {
    if (!email || !password ) {
      return res.status(400).json({ message: "All Fields Required!" });
    }

    const user = await User.findOne({$or: [{email: email}]})
    if(!user){
       return res.status(401).json({
        message: "User Not Found!",
      });
    }

    const validatePassword = await bcrypt.compare(password,user.password);
    if(!validatePassword){
       return res.status(401).json({
        message: "Invalid Credentials!",
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage
      },
      token,
      message : "Login Successfully"
    })

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export const signup = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    if (!email || !password || !username) {
      return res.status(400).json({ message: "All Fields Required!" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ messsage: "Password should be at least  charcters long" });
    }

    const emailExisted = await User.findOne({ $or: [{ email }] });
    if (emailExisted) {
      return res.status(400).json({ message: "Email already Exists!" });
    }
    const usernameExisted = await User.findOne({ $or: [{ username }] });
    if (usernameExisted) {
      return res.status(400).json({ message: "Username already Exists!" });
    }

    const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      username,
      password: hashedPassword,
      profileImage,
    });

    await user.save();
    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.log("Error in register routes", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
