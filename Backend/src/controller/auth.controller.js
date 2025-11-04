import express from 'express';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';

export const signup = async (req, res) => {
  // Handle signup
  const { email, fullname, password } = req.body;
  try {
    if (!email || !fullname || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 6 characters long' });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      fullname,
      password: hashedPassword,
    });
    if (newUser) {
      // Generate JWT token
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        user: {
          id: newUser._id,
          email: newUser.email,
          fullname: newUser.fullname,
          profilepic: newUser.profilepic,
        },
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Error during signup:', error.message);
    res.status(500).json({ message: 'internal Server error' });
  }
};

export const login = (req, res) => {
  // Handle login
  res.send('Login route');
};

export const logout = (req, res) => {
  // Handle logout
  res.send('Logout route');
};
