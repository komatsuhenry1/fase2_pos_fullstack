const { supabase } = require('../config/supabaseClient');
const { v4: uuidv4 } = require('uuid');

const TABLE = "users";

const AuthModel = {
    //register user deve criar um id automaticamente
    async registerUser(name, email, username, password, role, age) {
        id = uuidv4();
        const { data, error } = await supabase
            .from(TABLE)
            .insert({ id, name, email, username, password, role, age })
            .select();
        if (error) throw error;
        return data[0];
    },
    async loginUser(email, password) {
        console.log(email, password);
        const { data, error } = await supabase
            .from(TABLE)
            .select()
            .eq('email', email)
            .eq('password', password)
            .single();
        if (error) throw error;
        return data;
    }
}

module.exports = { AuthModel };