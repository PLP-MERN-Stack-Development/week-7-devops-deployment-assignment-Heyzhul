const express = require('express');
const router = express.Router();
const { createPost, getPosts } = require('../controllers/postsController');

router.post('/', createPost);
router.get('/', getPosts);

module.exports = router;
