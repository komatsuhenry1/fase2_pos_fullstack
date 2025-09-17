const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');

// rotas CRUD para admin
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

//ambos
router.get('/', postController.getAllPosts);
router.get('/search/:string', postController.getPostByString);
router.get('/:id', postController.getPostById);


module.exports = router;
