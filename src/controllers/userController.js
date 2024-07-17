import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import Rating from '../models/ratingModel.js';

// @desc Auth user/set token
// route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    user.password = undefined;

    res.status(200).json(user);
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc Register a new user
// route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, firstname, lastname, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create Rating
  // const rating = await Rating.create({
  //   rate: 0,
  //   count: 0,
  // });

  // Create the user
  const user = await User.create({
    firstname,
    lastname,
    email,
    password,
    // rating: rating._id,
  });

  if (user) {
    generateToken(res, user._id);
    user.password = undefined;
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc Logout user
// route POST /api/users/logout
// access Public

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'User logged out' });
});

// @desc Get user profile
// route GET /api/users/profile
// access Private
const getUserProfile = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  const user = {
    _id: req.user._id,
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    email: req.user.email,
  };

  res.status(200).json(user);
});

// @desc Update user profile
// route PUT /api/users/profile
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    updatedUser.password = undefined;

    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export default {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
