const express = require('express');

const reviewController = require('../controllers/reviewController');

const router = express.Router();

router.post('/', reviewController.create);
router.route('/:reviewId').put(reviewController.update).delete(reviewController.remove);

module.exports = router;
