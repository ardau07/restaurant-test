const db = require('../../db/models');
const ROLES = require('../../constants/roles');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({
        error: 'User is not found',
      });
    }

    db.User.checkPassword(password, user.password, async (err, isMatch) => {
      if (isMatch) {
        const token = await db.User.generateToken(user);
        return res.status(200).json({
          token,
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
          },
        });
      }

      return res.status(400).json({
        error: 'Password is not matched',
      });
    });
  } catch (err) {
    return res.status(500).json({
      error: err.toString(),
    });
  }
};

const signup = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  const error = {};
  const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  // Validation
  if (!email) {
    error.email = 'Email is required';
  } else if (!emailRegEx.test(email)) {
    error.email = 'Email is not valid';
  }
  if (!password) {
    error.password = 'Password is required';
  }
  if (!firstName) {
    error.firstName = 'First name is required';
  }
  if (!lastName) {
    error.lastName = 'Last name is required';
  }
  if (!role) {
    error.role = 'Role is required';
  }

  if (Object.keys(error).length > 0) {
    return res.status(400).json({
      error,
    });
  }

  try {
    const user = await db.User.create({
      email,
      password,
      firstName,
      lastName,
      role,
    });
    const token = await db.User.generateToken(user);

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    if (err.errors && err.errors[0].message === 'email must be unique') {
      return res.status(409).json({
        error: 'Email is already taken',
      });
    }
    return res.status(500).json({
      error: err.toString(),
    });
  }
};

const getUser = async (req, res) => {
  return res.json({ user: req.user });
};

module.exports = {
  login,
  signup,
  getUser,
};
