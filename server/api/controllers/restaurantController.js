const { Op } = require('sequelize');

const db = require('../../db/models');
const ROLES = require('../../constants/roles');

const get = async (req, res) => {
  const { limit, offset, minRating, maxRating } = req.query;
  let where = {};

  if (req.user.role === ROLES.OWNER) {
    where['ownerId'] = req.user.id;
  }
  if (minRating) {
    where['avgRating'] = {
      [Op.gte]: minRating,
    };
  }
  if (maxRating) {
    where['avgRating'] = {
      ...where['avgRating'],
      [Op.lte]: maxRating,
    };
  }

  try {
    const restaurants = await db.Restaurant.findAll({
      where,
      attributes: ['id', 'name', 'avgRating', 'numberOfReviews'],
      include: [
        {
          model: db.User,
          foreignKey: 'ownerId',
          as: 'owner',
          attributes: ['id', 'firstName', 'lastName'],
        },
      ],
      limit,
      offset,
      order: [['avgRating', 'DESC']],
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
      avgRating: 0,
      numberOfReviews: 0,
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
      attributes: ['id', 'name', 'avgRating', 'numberOfReviews'],
      include: [
        {
          model: db.User,
          foreignKey: 'ownerId',
          as: 'owner',
          attributes: ['id', 'firstName', 'lastName'],
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
  get,
  create,
  update,
  remove,
};
