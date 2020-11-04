const express = require('express');

const restaurantController = require('../controllers/restaurantController');
const reviewController = require('../controllers/reviewController');
const middlewares = require('../middlewares');
const ROLES = require('../../constants/roles');

const router = express.Router();

router
  .route('/')
  .get(restaurantController.get)
  .post(middlewares.checkRole([ROLES.OWNER]), restaurantController.create);

router
  .route('/:restaurantId')
  .put(
    middlewares.checkRole([ROLES.ADMIN]),
    middlewares.checkRestaurantExist,
    restaurantController.update
  )
  .delete(
    middlewares.checkRole([ROLES.ADMIN]),
    middlewares.checkRestaurantExist,
    restaurantController.remove
  );

router.route('/:restaurantId/reviews').get(reviewController.get).post(reviewController.create);
router
  .route('/:restaurantId/reviews/:reviewId')
  .put(
    middlewares.checkRole([ROLES.OWNER, ROLES.ADMIN]),
    middlewares.checkReviewExist,
    reviewController.update
  )
  .delete(
    middlewares.checkRole([ROLES.ADMIN]),
    middlewares.checkReviewExist,
    reviewController.remove
  );

module.exports = router;
