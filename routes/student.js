const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController');

// router.get('/posts', studentController.getAllPosts);
// router.get('/posts/:id', studentController.getPostById);
// router.get('/posts/search', studentController.getAllPosts); // possível reaproveitamento da funcao // Este endpoint permitirá a busca de posts por palavras-chave. Os usuários poderão passar uma query string com o termo de busca e o sistema retornará uma lista de posts que contêm esse termo no título ou conteúdo


module.exports = router;
