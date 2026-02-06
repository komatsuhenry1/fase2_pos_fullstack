const { supabase } = require('../config/supabaseClient');

const TABLE = "users";

const UserModel = {
    async getAllUsers() {
        const { data, error } = await supabase
            .from(TABLE)
            .select('*');
        if (error) throw error;
        return data;
    },
    async getUserById(id) {
        const { data, error } = await supabase
        .from(TABLE)
        .select('*')
        .eq('id', id);
        if (error) throw error;
        return data;
    },
    async updateUser(id, name, email, password, role, username, age) {
        const { data, error } = await supabase
        .from(TABLE)
        .update({ name, email, password, role, username, age })
        .eq('id', id);
        if (error) throw error;
        return data;
    },
    async deleteUser(id) {
        const { data, error } = await supabase
        .from(TABLE)
        .delete()
        .eq('id', id);
        if (error) throw error;
        return data;
    },
    async getAllAdmins() {
        const { data, error } = await supabase
        .from(TABLE)
        .select('*')
        .eq('role', 'admin');
        if (error) throw error;
        return data;
    }
}

module.exports = { UserModel };