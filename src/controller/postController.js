const { PostModel } = require('../model/postModel');
const { CommentModel } = require('../model/commentModel');

const createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    // Fail Fast: Validação inicial
    if (!title || !content || !author) {
      return res.status(400).json({
        error: 'Missing required fields: title, content and author are required'
      });
    }

    const newPost = await PostModel.create({ title, content, author });
    return res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    return res.status(500).json({ error: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.getAllPosts();
    return res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return res.status(500).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPost = await PostModel.updatePost(id, req.body);

    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found to update' });
    }

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    return res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await PostModel.deletePost(id);

    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found to delete' });
    }

    return res.status(200).json(deletedPost);
  } catch (error) {
    console.error('Error deleting post:', error);
    return res.status(500).json({ error: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await PostModel.getPostById(id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    return res.status(200).json(post);
  } catch (error) {
    // Tratamento específico para erro do Postgrest (PGRST116: JSON object requested, multiple (or no) rows returned)
    if (error.code === 'PGRST116') {
      return res.status(404).json({ error: 'Post not found' });
    }
    console.error('Error fetching post by ID:', error);
    return res.status(500).json({ error: error.message });
  }
};

const getPostByString = async (req, res) => {
  try {
    const { string } = req.params;
    const postByString = await PostModel.getPostByString(string);
    return res.json(postByString);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const postComment = async (req, res) => {
  const { id } = req.params;
  const { name, comment } = req.body;

  try {
    if (!id || !name || !comment) {
      return res.status(400).json({ error: "Missing required fields: Post ID (in URL), name or comment" });
    }

    const newComment = await CommentModel.createComment(id, {
      name,
      comment
    });

    return res.status(201).json(newComment);
  } catch (error) {
    console.error("Error posting comment:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  getPostById,
  getPostByString,
  postComment
};