import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../entities/user';
import logger from '../utils/logger';

/**
 * Given a json request 
 * {"username": "<...>", "password": "<...>"}
 * Verify the user is valid and return some authentication token
 * which can be used to verify protected resources
 * {"user": <{...}>, "token": "<...>""}
 */
export const login = async (req, res) => {
	// res.status(404).json({ err: "not implemented" })
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if(!existingUser) return res.status(404).json({ message: "User doesn't exist."});

    console.log("===========")
    console.log(existingUser.password)
    console.log(password)
    console.log("===========")
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password, function (err, result) {
      // console.log(result)
      if(err) return res.status(400).json({ message: "Invalid credentials." });
    });
    // console.log("===========")
    // console.log(`isPasswordCorrect: ${isPasswordCorrect}`)
    // console.log("===========")
    // if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign({ user: existingUser.username, email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};
/**
 * Given a json request 
 * {"username": "<...>", "password": "<...>"}
 * Create a new user and return some authentication token 
 * which can be used to verify protected resources
 * {"user": <{...}>, "token": "<...>""}
 */
export const signup = async (req, res) => {
	// res.status(404).json({ err: "not implemented" })
  const { email, username, password, confirmPassword, name } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) return res.status(400).json({ message: "User already exists." });

    if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match."});

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ username, email, password: hashedPassword, name });

    const token = jwt.sign({ user: result.username, email: result.email, id: result._id }, 'test', { expiresIn: "1h"});

    res.status(200).json({ result, token});
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
};
/**
 * Implement a way to recover user accounts
 */
export const forgotPassword = (req, res) => {
	res.status(404).json({ err: "not implemented" })
};

export default {
	login,
	signup,
	forgotPassword
}