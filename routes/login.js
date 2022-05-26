const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/user');
const config = require('config');
//This route handles the following
// Get user input
// Validate user input
// Validate if user exists
// Verify user password against the password we save in db
// create a jwt token

router.post('/', async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return res.status(400).send('All Input is required');
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user.id, email },
        config.get('jwtSecret'),
        {
          expiresIn: '2h',
        }
      );
      //save token and return new user
      user.token = token;
      res.status(200).json(user);
    }
    res.status(400).send('Invalid credentials');
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: 'Server Error' });
  }
});

module.exports = router;
