const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

// se nao definir a funcao na controller mas declarar ela aqui da erro

router.post('/posts', adminController.createPost);
// router.put('/posts/:id', adminController.updateAllPost);
// router.patch('/posts/:id', adminController.updatePartialPost);
// router.get('/posts/:id', adminController.getAllPosts); // possível reaproveitamento da funcao
// router.delete('/posts/:id', adminController.deletePost); // possível reaproveitamento da funcao
// router.get('/posts/search', adminController.getPostByKeyWord); // possível reaproveitamento da funcao // Este endpoint permitirá a busca de posts por palavras-chave. Os usuários poderão passar uma query string com o termo de busca e o sistema retornará uma lista de posts que contêm esse termo no título ou conteúdo


module.exports = router;

