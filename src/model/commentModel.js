const { supabase } = require('../config/supabaseClient');
const { v4: uuidv4 } = require('uuid');

const TABLE = "comments";

const CommentModel = {
    async createComment(postId, data) {
        const id = uuidv4();
        const now = new Date().toISOString();

        const postData = {
            id: id,
            post_id: postId,
            user_id: data.user_id,
            name: data.name,
            comment: data.comment,
            created_at: now
        };

        const { data: comment, error } = await supabase
            .from(TABLE)
            .insert([postData])
            .select();

        if (error) {
            throw new Error(`Supabase Error: ${error.message}`);
        }

        if (!comment || comment.length === 0) {
            throw new Error('Error creating comment: No data returned');
        }

        return comment[0];
    },
};

module.exports = { CommentModel };