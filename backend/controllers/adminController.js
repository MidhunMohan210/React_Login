import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import generateAdminToken from "../utils/generateAdminToken.js";
import User from "../models/userModel.js";

//@desc Auth admin/set token
//route POST /api/admin/auth
//@access Public

const authAdmin = asyncHandler(async (req, res) => {
  console.log("one");
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (admin) {

    if (admin.password === password) {
      console.log("token creation");
      const adminToken=generateAdminToken(res, admin._id);
      res.status(201).json({
        _id: admin._id,
        email: admin.email,
      });
    } else {
  console.log("Invalid Email or Password");

      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  } else {
  console.log("Invalid Admin");
    
    res.status(401);
    throw new Error("Invalid Admin");
  }
});

//@desc Auth admin/logout
//route POST /api/admin/logout
//@access Public

const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie("jwtAdmin", "", {
    httpOnly: true,
    expires: new Date(),
  });
  res.status(200).json({ message: "Admin logged out" });
});

//@desc Auth admin/GETUSER
//route POST /api/admin/get-user
//@access Private

const getAllUser = asyncHandler(async (req, res) => {
  const userData = await User.find({}, { name: 1, email: 1 ,profileImageName:1});
  if (userData) {
    res.status(200).json(userData);
  } else {
    res.status(400);
    throw new Error("Error in fetching data");
  }
});

//@desc Auth admin/UPDATEUSER
//route PUT /api/admin/update-user
//@access Private

const updateUserData = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  const user = await User.findById(userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    const updateUser = await user.save();

    res.status(200).json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
    });
  } else {
    res.status(400);
    throw new Error("user not found");
  }
});

//@desc Auth admin/Delete User
//route DELETE /api/admin/delete-user
//@access Private

const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  const deleted = await User.findByIdAndDelete(userId);

  if (deleted) {
    res
      .status(200)
      .json({ success: true, message: "User Deleted Succesfully" });
  } else {
    res.status(404).json({ success: false, message: "USER delete Failed" });
  }
});

//@desc Auth admin/Add User
//route DELETE /api/admin/add-user
//@access Private

const addNewUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);

    throw new Error("User alredy exists");
  } else {
    const user = await User.create({
      name,
      email,
      password,
    });
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});

export { authAdmin, logoutAdmin, addNewUser,deleteUser,updateUserData,getAllUser };
