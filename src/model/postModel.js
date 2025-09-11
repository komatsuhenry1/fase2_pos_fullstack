const { supabase } = require('../config/supabaseClient');

const TABLE = "posts";

const PostModel = {
  async create(data) {
    const { data: newPost, error } = await supabase
      .from(TABLE)
      .insert([data])
      .select();
    if (error) throw error;
    return newPost[0];
  },

};

module.exports = { PostModel };
