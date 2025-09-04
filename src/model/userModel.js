const { supabase } = require('../config/supabaseClient');

const TABLE = "users";

const UserModel = {
  async create(data) {
    const { data: newUser, error } = await supabase
      .from(TABLE)
      .insert([data])
      .select();
    if (error) throw error;
    return newUser[0];
  },

  async findAll() {
    const { data, error } = await supabase.from(TABLE).select("*");
    if (error) throw error;
    return data;
  },

  async findById(id) {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from(TABLE)
      .update(updates)
      .eq("id", id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async remove(id) {
    const { error } = await supabase.from(TABLE).delete().eq("id", id);
    if (error) throw error;
    return { message: "User deleted successfully" };
  },
};

module.exports = { UserModel };
