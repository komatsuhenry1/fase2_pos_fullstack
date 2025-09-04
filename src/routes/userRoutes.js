const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Rotas CRUD para usuários
router.get('/posts', userController.getAllPosts);
router.get('/posts/:id', userController.getPostById);
router.post('/posts', userController.createPost);
router.put('/posts/:id', userController.updatePost);
router.delete('/posts/:id', userController.deletePost);

module.exports = router;
