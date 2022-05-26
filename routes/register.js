const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// This route handles the following :
// Get user input
// validate user input and validate whether the user exists
// encrypt the user password
// Create a new user in our db
// Create a signed JWT token

router.post('/', async (req, res) => {
  try {
    // Get user input from req.body
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send('All input is required');
    }
    // check if user already exists
    // validate if use exists in db
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send('User Already Exists. Please Login');
    }
    // Encrypt password
    let encryptedPassword = await bcrypt.hash(password, 10);

    // Add user to DB
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });
    //Create token
    const token = jwt.sign(
      { user_id: user.id, email },
      config.get('jwtSecret'),
      {
        expiresIn: '2h',
      }
    );
    //save token and return new user
    user.token = token;
    res.status(201).json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
