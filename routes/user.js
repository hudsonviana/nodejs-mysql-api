const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.index);
router.post('/sign-up', userController.signUp);
router.post('/login', userController.login);
router.delete('/:id', userController.destroy);

module.exports = router;
