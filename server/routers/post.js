const express = require('express');
const { getPosts, getPost, createPost, updatePost, deletePost, likePost } = require('../controllers/posts');

const router = express.Router();
router.get('/', getPosts);
router.post('/', createPost);
router.get('/:id', getPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id', likePost);

module.exports = router;