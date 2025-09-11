const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');

// Rotas CRUD para usuários
router.post('/post', postController.createPost);

// router.put('/posts/:id', userController.updatePost);
// router.get('/posts', userController.getAllPosts);
// router.get('/posts/:id', userController.getPostById);
// router.delete('/posts/:id', userController.deletePost);

module.exports = router;
