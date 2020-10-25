const db = require('../../db/models');

const create = async (req, res) => {
  const { rating, visitDate, comment, restaurantId, commenterId } = req.body;

  // validation
  const error = {};
  if (!rating) {
    error['rating'] = 'Rating is required';
  } else if (rating < 1 || rating > 5) {
    error['rating'] = 'Rating should be in 1 to 5';
  }
  if (!visitDate) error['visitDate'] = 'Visit date is required';
  if (!comment) error['comment'] = 'Comment is required';
  if (!restaurantId) error['restaurant'] = 'Restaurant is required';
  if (!commenterId) error['commenter'] = 'Commenter is required';
  if (Object.keys(error).length > 0) {
    return res.status(400).json({
      error,
    });
  }

  try {
    const review = await db.Review.create({
      rating,
      visitDate,
      comment,
      restaurantId,
      commenterId,
    });
    return res.status(201).json({
      review,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.toString(),
    });
  }
};

const update = async (req, res) => {
  const { reviewId } = req.params;

  console.log('reivew id: ', reviewId, req.params);
  try {
    await db.Review.update(
      {
        ...req.body,
      },
      { where: { id: reviewId } }
    );

    const review = await db.Review.findOne({
      where: { id: reviewId },
    });
    return res.status(200).json({ review });
  } catch (err) {
    return res.status(500).json({
      error: err.toString(),
    });
  }
};

const remove = async (req, res) => {
  const { reviewId } = req.params;

  try {
    await db.Review.destroy({
      where: { id: reviewId },
    });
    return res.status(204).json({ success: true });
  } catch (err) {
    return res.status(500).json({
      error: err.toString(),
    });
  }
};

module.exports = {
  create,
  update,
  remove,
};
