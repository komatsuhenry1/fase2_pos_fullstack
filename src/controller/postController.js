const { PostModel } = require('../model/postModel');

const createPost = async (req, res) => {
    try {
      if (!req.body) {
        return res.status(400).json({ error: 'Request body is missing' });
      }
  
      const { title, content , author} = req.body;
      
      if (!title || !content || !author) {
        return res.status(400).json({ 
          error: 'Missing required fields: title, content and author are required' 
        });
      }
  
      const user = await PostModel.create({ title, content , author});
      res.status(201).json(user);
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {
  createPost,
};



