const { supabase } = require('../config/supabaseClient');
const { v4: uuidv4 } = require('uuid');

const TABLE = "comments";

const CommentModel = {
    async createComment(post_id, data) {
        const comment_id = uuidv4();

        const now = new Date().toISOString();

        const commentData = {
            id: comment_id,
            post_id: post_id,
            user_id: data.user_id,
            name: data.name,
            comment: data.comment,
            created_at: now
        }

        const { data: comment, error } = await supabase
            .from(TABLE)
            .insert([commentData])
            .select();
        if (error) throw error;
        return comment[0];
    },

}

module.exports = { CommentModel };