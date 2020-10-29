const express = require('express');

const restaurantController = require('../controllers/restaurantController');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

router.route('/').get(restaurantController.read).post(restaurantController.create);

router.route('/:restaurantId/reviews').get(reviewController.get).post(reviewController.create);
router
  .route('/:restaurantId/reviews/:reviewId')
  .put(reviewController.update)
  .delete(reviewController.remove);

router.route('/:restaurantId').put(restaurantController.update).delete(restaurantController.remove);

module.exports = router;
