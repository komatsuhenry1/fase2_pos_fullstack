//RODAR NO DOCKER USANDO IMAGEM DO POSTGRE

// const { supabase } = require('../config/supabaseClient');
// const postgres = require('postgres');

// const sql = postgres({
//   host      : process.env.DB_HOST,       // .env -> 'db'
//   port      : process.env.DB_PORT,       // .env -> 5432
//   database  : process.env.DB_NAME,       // .env -> 'seu_banco_aqui'
//   username  : process.env.DB_USER,       // .env -> 'seu_usuario_aqui'
//   password  : process.env.DB_PASSWORD,   // .env -> 'sua_senha_segura_aqui'
// });

// const TABLE = "posts";

// const PostModel = {
//   /**
//    * Cria um novo post no banco de dados.
//    * @param {object} data - Contém title, content, e author do post.
//    * @returns {object} O post recém-criado.
//    */
//   async create(data) {
//     const { title, content, author } = data;
//     const [newPost] = await sql`
//       INSERT INTO ${sql(TABLE)} (title, content, author)
//       VALUES (${title}, ${content}, ${author})
//       RETURNING *
//     `;
//     return newPost;
//   },

//   /**
//    * @returns {Array<object>} Uma lista de todos os posts.
//    */
//   async getAllPosts() {
//     // MUDANÇA: A chamada do Supabase foi substituída por uma query SQL simples.
//     const posts = await sql`
//       SELECT * FROM ${sql(TABLE)}
//     `;
//     return posts;
//   },

//   /**
//    * Busca um post específico pelo seu ID.
//    * @param {string} id - O ID do post a ser buscado.
//    * @returns {object|undefined} O post encontrado ou undefined se não existir.
//    */
//   async getPostById(id) {
//     // MUDANÇA: Substituído '.select().eq().single()' por uma cláusula WHERE.
//     const [post] = await sql`
//       SELECT * FROM ${sql(TABLE)} WHERE id = ${id}
//     `;
//     return post;
//   },

//   /**
//    * Busca posts que contenham uma string no título, conteúdo ou autor.
//    * @param {string} string - O termo de busca.
//    * @returns {Array<object>} Uma lista de posts que correspondem à busca.
//    */
//   async getPostByString(string) {
//     // MUDANÇA: Substituído '.or()' do Supabase por uma query com ILIKE e OR.
//     const searchString = `%${string}%`; // Prepara a string para o comando LIKE
//     const posts = await sql`
//       SELECT * FROM ${sql(TABLE)} 
//       WHERE title ILIKE ${searchString} 
//          OR content ILIKE ${searchString} 
//          OR author ILIKE ${searchString}
//     `;
//     return posts;
//   },

//   /**
//    * Atualiza um post existente.
//    * @param {string} id - O ID do post a ser atualizado.
//    * @param {object} data - Os novos dados (title, content, author).
//    * @returns {object|undefined} O post atualizado.
//    */
//   async updatePost(id, data) {
//     // MUDANÇA: Removida a linha "updated_at = NOW()" para alinhar com o schema atual do banco.
//     const { title, content, author } = data;
//     const [updatedPost] = await sql`
//       UPDATE ${sql(TABLE_NAME)} SET
//         title = ${title},
//         content = ${content},
//         author = ${author}
//       WHERE id = ${id}
//       RETURNING *
//     `;
//     return updatedPost;
//   },


//   /**
//    * Deleta um post do banco de dados.
//    * @param {string} id - O ID do post a ser deletado.
//    * @returns {object|undefined} O post que foi deletado.
//    */
//   async deletePost(id) {
//     // MUDANÇA: Substituído '.delete().eq()' por um comando DELETE do SQL.
//     const [deletedPost] = await sql`
//       DELETE FROM ${sql(TABLE)} WHERE id = ${id}
//       RETURNING *
//     `;
//     return deletedPost;
//   },
// };


// module.exports = { PostModel };


//RODAR LOCALMENTE (USANDO SUPABASE)


const { supabase } = require('../config/supabaseClient');

const TABLE = "posts";

const PostModel = {
  async deleteAll() {
    const { error } = await supabase
      .from(TABLE)
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Condição para não apagar tudo se algo der errado
    if (error) throw error;
  },

  async create(data) {
    const now = new Date().toISOString();

    const postData = {
      ...data,
      status: data.status || 'Published',
      created_at: now,
      updated_at: now
    };

    const { data: newPost, error } = await supabase
      .from(TABLE)
      .insert([postData])
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
    const updatePayload = {
      ...data,
      updated_at: new Date().toISOString()
    };

    const { data: updatedPost, error } = await supabase
      .from(TABLE)
      .update(updatePayload)
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

  async getPostByString(string) {
    const { data: postByString, error } = await supabase
      .from(TABLE)
      .select()
      .or(`title.ilike.%${string}%,content.ilike.%${string}%,author.ilike.%${string}%`); //ilike -> "insensitive like" (ignora maiúsculas/minúsculas)
    if (error) throw error;
    return postByString;
  },

  async postComment(id, data) {
    const { data: comment, error } = await supabase
      .from(TABLE)
      .update(data.comment)
      .eq('id', id)
      .select();
    if (error) throw error;
    return comment[0];
  },  

};


module.exports = { PostModel };