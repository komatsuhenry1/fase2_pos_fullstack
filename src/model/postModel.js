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

  async getAllPosts() { // async func
    const { data: posts, error } = await supabase 
      .from(TABLE) // conecta a tabela posts
      .select(); // busca todos os campos
    if (error) throw error;
    return posts;
  },

  async updatePost(id, data) {
    const { data: updatedPost, error } = await supabase
      .from(TABLE)
      .update(data)
      .eq('id', id)
      .select();
    if (error) throw error;
    return updatedPost[0];
  },

  async deletePost(id) { 
    const { data: deletedPost, error } = await supabase
      .from(TABLE)
      .delete()
      .eq('id', id)
      .select();
    if (error) throw error;
    return deletedPost[0];
  },

  async getPostById(id) {
    const { data: postById, error } = await supabase
      .from(TABLE)
      .select()
      .eq('id', id)
      .single();
    if (error) throw error;
    return postById;
  },

  async getPostByString(string){
    const { data: postByString, error } = await supabase
      .from(TABLE)
      .select()
      .or(`title.ilike.%${string}%,content.ilike.%${string}%,author.ilike.%${string}%`); //ilike -> "insensitive like" (ignora maiúsculas/minúsculas)
    if (error) throw error;
    return postByString;
  }

};


module.exports = { PostModel };
