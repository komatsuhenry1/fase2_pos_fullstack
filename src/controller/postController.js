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
    
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found to update' });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const deletedPost = await PostModel.deletePost(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found to delete' });
    }

    res.status(200).json(deletedPost);
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await PostModel.getPostById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    if (error.code === 'PGRST116') {
      return res.status(404).json({ error: 'Post not found' });
    }
    console.error('Error fetching post by ID:', error);
    res.status(500).json({ error: error.message });
  }
};


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
