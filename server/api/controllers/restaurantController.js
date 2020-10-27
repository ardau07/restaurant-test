const db = require('../../db/models');
const ROLES = require('../../constants/roles');

const read = async (req, res) => {
  const { limit, offset, minRating, maxRating } = req.query;
  let where = {
    ownerId: req.user.id,
  };

  if (minRating) {
    where['rating'] = {
      [Op.gte]: minRating,
    };
  }
  if (maxRating) {
    where['rating'] = {
      ...where['rating'],
      [Op.lte]: maxRating,
    };
  }

  try {
    const restaurants = await db.Restaurant.findAll({
      where,
      include: [
        {
          model: db.Review,
          foreignKey: 'restaurantId',
          as: 'reviews',
          attributes: ['id', 'rating', 'visitDate', 'comment', 'reply'],
          include: [
            {
              model: db.User,
              foreignKey: 'commenterId',
              as: 'commenter',
              attributes: ['id', 'firstName', 'lastName'],
            },
          ],
        },
      ],
      limit,
      offset,
    });
    const totalCount = await db.Restaurant.count({
      where,
    });

    return res.status(200).json({
      restaurants,
      totalCount,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.toString(),
    });
  }
};

const create = async (req, res) => {
  const { ownerId, name } = req.body;

  // validation
  const error = {};
  if (!name) error['name'] = 'Restaurant name is required';
  if (req.user.role === ROLES.ADMIN && !ownerId) error['owner'] = 'Owner is required';

  if (Object.keys(error).length > 0) {
    return res.status(400).json({
      error,
    });
  }

  try {
    const restaurant = await db.Restaurant.create({
      name,
      ownerId: req.user.role === ROLES.ADMIN ? ownerId : req.user.id,
    });
    return res.status(201).json({
      restaurant,
    });
  } catch (err) {
    return res.status(200).json({
      error: err.toString(),
    });
  }
};

const update = async (req, res) => {
  const { restaurantId } = req.params;

  try {
    await db.Restaurant.update(
      {
        ...req.body,
      },
      { where: { id: restaurantId } }
    );

    const restaurant = await db.Restaurant.findOne({
      where: { id: restaurantId },
      include: [
        {
          model: db.Review,
          foreignKey: 'restaurantId',
          as: 'reviews',
          attributes: ['id', 'rating', 'visitDate', 'comment', 'commenterId'],
          include: [
            {
              model: db.User,
              foreignKey: 'commenterId',
              as: 'commenter',
              attributes: ['id', 'firstName', 'lastName'],
            },
          ],
        },
      ],
    });

    return res.status(200).json({ restaurant });
  } catch (err) {
    return res.status(200).json({
      error: err.toString(),
    });
  }
};

const remove = async (req, res) => {
  const { restaurantId } = req.params;

  try {
    await db.Restaurant.destroy({
      where: { id: restaurantId },
    });

    return res.status(204).json({ success: true });
  } catch (err) {
    return res.status(500).json({
      error: err.toString(),
    });
  }
};

module.exports = {
  read,
  create,
  update,
  remove,
};