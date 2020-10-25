const express = require('express');

const restaurantController = require('../controllers/restaurantController');

const router = express.Router();

router.route('/').get(restaurantController.read).post(restaurantController.create);
router.route('/:restaurantId').put(restaurantController.update).delete(restaurantController.remove);

module.exports = router;
