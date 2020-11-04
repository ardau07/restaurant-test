const db = require('../../db/models');

const checkRole = (roles) => (req, res, next) => {
  if (roles.indexOf(req.user.role) >= 0) {
    next();
    return;
  }

  return res.status(403).json({
    error: "You don't have permission",
  });
};

const checkUserExist = async (req, res, next) => {
  const { userId } = req.params;

  const user = await db.User.findOne({
    where: { id: userId },
  });
  if (!user) {
    return res.status(404).json({
      error: 'User not found',
    });
  }
  next();
};

const checkRestaurantExist = async (req, res, next) => {
  const { restaurantId } = req.params;

  const restaurant = await db.Restaurant.findOne({
    where: { id: restaurantId },
  });
  if (!restaurant) {
    return res.status(404).json({
      error: 'Restaurant not found',
    });
  }
  next();
};

const checkReviewExist = async (req, res, next) => {
  const { reviewId } = req.params;

  const review = await db.Review.findOne({
    where: { id: reviewId },
  });
  if (!review) {
    return res.status(404).json({
      error: 'Review not found',
    });
  }
  next();
};

module.exports = {
  checkRole,
  checkUserExist,
  checkRestaurantExist,
  checkReviewExist,
};
