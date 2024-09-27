require('dotenv').config();

const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const path = require('path');
const bcrypt = require('bcrypt');

const bodyParser = require('body-parser');

const addNewUser = require('../../database/queries/add_new_user')



router.post ('/', async (req, res) => {
  try {
 

    const { firstName, lastName, email, password } = req.body;


    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await addNewUser(firstName, lastName, email, hashedPassword);
    console.log("New user created for: ", user);


    if (user.success) {
      req.session.user = { id: user.user.id, email: user.user.email };
      console.log("inside the enw user signup", req.session.user)
      console.log("inside the enw user signup", req.sessionID)

    }


    return res.status(200).json({
      message: 'Login successful',
      session: req.sessionID,
    });

  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


module.exports = router;

