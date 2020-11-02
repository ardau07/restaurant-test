const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.route('/').get(userController.get).post(userController.create);

router.route('/:userId').put(userController.update).delete(userController.remove);

module.exports = router;
