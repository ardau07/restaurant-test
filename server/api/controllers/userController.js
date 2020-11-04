const { Op } = require('sequelize');

const db = require('../../db/models');
const ROLES = require('../../constants/roles');

const get = async (req, res) => {
  const { limit, offset } = req.query;

  try {
    let where = {
      [Op.not]: [{ id: req.user.id }],
    };

    const users = await db.User.findAll({
      where,
      attributes: ['id', 'firstName', 'lastName', 'email', 'role'],
      limit,
      offset,
    });
    const totalCount = await db.User.count({
      where,
    });

    return res.status(200).json({ users, totalCount });
  } catch (err) {
    return res.status(500).json({
      error: err.toString(),
    });
  }
};

const create = async (req, res) => {
  const { firstName, lastName, role, email, password } = req.body;
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

    return res.status(200).json({
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

const update = async (req, res) => {
  const { userId } = req.params;

  try {
    const prevUser = await db.User.findOne({
      where: { id: userId },
    });

    await db.User.update(
      {
        ...req.body,
      },
      {
        where: { id: userId },
        individualHooks: true,
      }
    );

    const user = await db.User.findOne({
      where: { id: userId },
      attributes: ['id', 'firstName', 'lastName', 'email', 'role'],
    });

    if (prevUser.role === ROLES.OWNER && user.role !== ROLES.OWNER) {
      await db.Restaurant.destroy({
        where: { ownerId: user.id },
      });
    } else if (prevUser.role === ROLES.USER && user.role !== ROLES.USER) {
      const reviews = await db.Review.findAll({
        where: { commenterId: userId },
      });

      const promises = reviews.map(async (review) => {
        const restaurant = await db.Restaurant.findOne({
          where: { id: review.restaurantId },
        });
        return db.Restaurant.update(
          {
            avgRating:
              restaurant.numberOfReviews === 1
                ? 0
                : (restaurant.avgRating * restaurant.numberOfReviews - review.rating) /
                  (restaurant.numberOfReviews - 1),
            numberOfReviews: restaurant.numberOfReviews - 1,
          },
          { where: { id: review.restaurantId } }
        );
      });

      await Promise.all(promises);
    }

    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({
      error: err.toString(),
    });
  }
};

const remove = async (req, res) => {
  const { userId } = req.params;

  try {
    const reviews = await db.Review.findAll({
      where: { commenterId: userId },
    });

    const promises = reviews.map(async (review) => {
      const restaurant = await db.Restaurant.findOne({
        where: { id: review.restaurantId },
      });
      return db.Restaurant.update(
        {
          avgRating:
            restaurant.numberOfReviews === 1
              ? 0
              : (restaurant.avgRating * restaurant.numberOfReviews - review.rating) /
                (restaurant.numberOfReviews - 1),
          numberOfReviews: restaurant.numberOfReviews - 1,
        },
        { where: { id: review.restaurantId } }
      );
    });

    await Promise.all(promises);

    await db.User.destroy({
      where: { id: userId },
    });

    return res.status(204).json({ success: true });
  } catch (err) {
    return res.status(500).json({
      error: err.toString(),
    });
  }
};

module.exports = {
  get,
  create,
  update,
  remove,
};
