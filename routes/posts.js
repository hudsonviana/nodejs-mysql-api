const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');

router.post('/', postController.save);
router.get('/:id', postController.show);
router.get('/', postController.index);
router.patch('/:id', postController.update);
router.delete('/:id', postController.destroy);

module.exports = router;
