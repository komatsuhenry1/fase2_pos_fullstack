const { PostModel } = require('../model/postModel');

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: ID único do post
 *         title:
 *           type: string
 *           description: Título do post
 *         content:
 *           type: string
 *           description: Conteúdo do post
 *         author:
 *           type: string
 *           description: Nome do autor
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Data de criação
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Data de atualização
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Criar um novo post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Meu Primeiro Post"
 *               content:
 *                 type: string
 *                 example: "Este é o conteúdo do meu post"
 *               author:
 *                 type: string
 *                 example: "João Silva"
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
const createPost = async (req, res) => {
    try {
      if (!req.body) {
        return res.status(400).json({ error: 'Request body is missing' });
      }
  
      const { title, content , author} = req.body;
      // mesma coisa de 
      // const title = req.body.title; 
      // const content = req.body.content;
      // const author = req.body.author; 
      
      if (!title || !content || !author) {
        return res.status(400).json({ 
          error: 'Missing required fields: title, content and author are required' 
        });
      }
  
      const user = await PostModel.create({ title, content , author});
      res.status(201).json(user); // .sjon converte para json envia como resposta
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: error.message });
    }
  };

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Buscar todos os posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Lista de posts retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Erro interno do servidor
 */
  const getAllPosts = async (req, res) => {
    try {
      const posts = await PostModel.getAllPosts();
      res.json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: error.message });
    }
  }

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Atualizar um post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
  const updatePost = async (req, res) => {
    try {
      const updatedPost = await PostModel.updatePost(req.params.id, req.body);
      res.json(updatedPost);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Deletar um post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post
 *     responses:
 *       200:
 *         description: Post deletado com sucesso
 *       404:
 *         description: Post não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
  const deletePost = async (req, res) => {
    try {
      const deletedPost = await PostModel.deletePost(req.params.id);
      res.json(deletedPost);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  deletePost
};
