import asyncHandler from 'express-async-handler'

import bcrypt from 'bcryptjs'
import generateToken from '../config/generateToken.js';
import User from '../models/userModal.js';


const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(409).json({
      success: false,
      message:"User already exists with same email"
    })
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    password:hashedPassword,
  })
  if (user) {
     res.status(201).json(
      {
        success: true,
        message: "User successfully registered",
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
    );
    return;
  } else {
    return res.status(400).json({
      success: false,
      message:"Failed to create user",
    })
  }

})

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(403).json({
      success: false,
      message: "User does not exist",
    });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(403).json({
      success: false,
      message: "Invalid Credentials",
    });
  } else {
     res.json({
      success: true,
      message:"Login succesfull",
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
     });
    
    return;
  }
});

const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password"); // Exclude password

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.json({
    success: true,
    message: "User profile fetched successfully",
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { name, email, currentPassword, newPassword } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  let hasChanges = false;

  if (name && name !== user.name) {
    user.name = name;
    hasChanges = true;
  }

  if (email && email !== user.email) {
    user.email = email;
    hasChanges = true;
  }

  if (currentPassword || newPassword) {
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Both current and new password are required to change password",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }
    if (newPassword.trim() === "" || newPassword === currentPassword) {
      return res.status(400).json({
        success: false,
        message: "New password cannot be empty or same as current password",
      });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    hasChanges = true;
  }
  if (!hasChanges) {
    return res.status(400).json({
      success: false,
      message: "No changes made to profile",
    });
  }

  const updatedUser = await user.save();

  return res.json({
    success: true,
    message: "User profile updated successfully",
    name: updatedUser.name,
    email: updatedUser.email,
  });
});

export { registerUser, login, updateProfile, getProfile };