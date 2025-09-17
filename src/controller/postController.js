const { PostModel } = require('../model/postModel');


const createPost = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: 'Request body is missing' });
    }

    const { title, content, author } = req.body;
    // mesma coisa de 
    // const title = req.body.title; 
    // const content = req.body.content;
    // const author = req.body.author; 

    if (!title || !content || !author) {
      return res.status(400).json({
        error: 'Missing required fields: title, content and author are required'
      });
    }

    const user = await PostModel.create({ title, content, author });
    res.status(201).json(user); // .sjon converte para json envia como resposta
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.getAllPosts();
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: error.message });
  }
}

const updatePost = async (req, res) => {
  try {
    const updatedPost = await PostModel.updatePost(req.params.id, req.body);
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deletePost = async (req, res) => {
  try {
    const deletedPost = await PostModel.deletePost(req.params.id);
    res.json(deletedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getPostById = async (req, res) => {
  try {
    const postById = await PostModel.getPostById(req.params.id);
    res.json(postById);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getPostByString = async (req, res) => {
  try {
    const postByString = await PostModel.getPostByString(req.params.string);
    res.json(postByString);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  getPostById,
  getPostByString
};
