const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');
const { authAdmin, authUserAndAdmin } = require('../middlewares/roleMiddleware');
const cors = require('cors');
// colocar cors 
router.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// rotas CRUD para admin
router.post('/', authAdmin('admin'), postController.createPost);
router.put('/:id', authAdmin('admin'), postController.updatePost);
router.delete('/:id', authAdmin('admin'), postController.deletePost);

// rotas para ambos os perfis ('admin' e 'user')
// 3. Aplicamos o middleware isAuthenticated para garantir que o usuário está "logado"
router.get('/', authUserAndAdmin, postController.getAllPosts);
router.get('/search/:string', authUserAndAdmin, postController.getPostByString);
router.get('/:id', authUserAndAdmin, postController.getPostById);

module.exports = router;
