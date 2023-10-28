import asyncHandeler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/genereteToken.js";

//@decs Auth user/set token
//route  POST/api/users/auth
//@access public
const authUser = asyncHandeler(async (req, res) => {
  
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//@decs Register a new user
//route  POST/api/users
//@access public
const registerUser = asyncHandeler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  console.log("userExists", userExists);

  if (userExists) {
    res.status(400);
    throw new Error("User already exist");
  } else {
    const user = await User.create({
      name,
      email,
      password,
    });
    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("invalid user data");
    }
  }
});

//@decs Logout
//route  POST/api/users/logout
//@access public
const logoutUser = asyncHandeler(async (req, res) => {

  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
  
});

//@decs get user profile
//route  GET/api/users/proile
//@access private
const getUserprofile = asyncHandeler(async (req, res) => {
  console.log(req.user);
  const user = {
    _id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user);
});

//@decs update user profile
//route  POST/api/users/profile
//@access private
const updateUserProfile = asyncHandeler(async (req, res) => {
  const user = await User.findById(req.user._id);
  // console.log(user);
  if (user) {
    console.log(req.body);

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }
    if(req.file){
      user.profileImageName = req.file.filename || user.profileImageName;
  }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profileImageName:updatedUser.profileImageName

    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserprofile,
  updateUserProfile,
};
