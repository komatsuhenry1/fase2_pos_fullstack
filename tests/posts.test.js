const request = require('supertest');
const app = require('../app');
const { PostModel } = require('../src/model/postModel');

// chama .next para pessar pelo middlewarew
jest.mock('../src/middlewares/roleMiddleware', () => ({
    authAdmin: (role) => (req, res, next) => next(),
    authUserAndAdmin: (req, res, next) => next(),
}));

describe('Posts API', () => {

    //deleta toda a table
    beforeEach(async () => {
        await PostModel.deleteAll();
    });

    //comentario para teste de push!!

    describe('POST /posts', () => {
        it('deve criar um novo post com dados válidos', async () => {
            const newPostData = {
                title: "post title",
                content: "post content",
                author: "post author"
            };

            const response = await request(app)
                .post('/posts')
                .send(newPostData);

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.title).toBe(newPostData.title);
        });

        it('deve retornar erro 400 se campos obrigatórios estiverem faltando', async () => {
            const invalidPostData = { title: "Post incompleto" };

            const response = await request(app)
                .post('/posts')
                .send(invalidPostData);

            expect(response.statusCode).toBe(400);
            expect(response.body.error).toContain('Missing required fields');
        });
    });

    describe('GET /posts', () => {
        it('deve retornar uma lista de todos os posts', async () => {
            await PostModel.create({ title: 'teste', content: 'teste', author: 'teste' });
            await PostModel.create({ title: 'teste', content: 'teste', author: 'teste' });

            const response = await request(app).get('/posts');

            expect(response.statusCode).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            //expect(response.body.length).toBe(2);
        });
    });

    describe('GET /posts/:id', () => {
        it('deve retornar um post específico pelo seu ID', async () => {
            const newPost = await PostModel.create({ title: 'title', content: 'teste', author: 'teste' });

            const response = await request(app).get(`/posts/${newPost.id}`);

            expect(response.statusCode).toBe(200);
            expect(response.body.id).toBe(newPost.id);
            expect(response.body.title).toBe('title');
        });

        it('deve retornar 404 se o post não for encontrado', async () => {
            const nonExistentId = '00000000-0000-0000-0000-000000000000';
            const response = await request(app).get(`/posts/${nonExistentId}`);
            expect(response.statusCode).toBe(404);
        });
    });

    describe('GET /posts/search/:string', () => {
        it('deve retornar posts que correspondem ao termo de busca', async () => {
            await PostModel.create({ title: 'post string query', content: 'teste', author: 'teste' });
            await PostModel.create({ title: 'post string query', content: 'teste1', author: 'teste' });

            const response = await request(app).get('/posts/search/teste1');

            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBe(1);
            expect(response.body[0].title).toBe('post string query');
        });
    });

    describe('PUT /posts/:id', () => {
        it('deve atualizar um post existente', async () => {
            const originalPost = await PostModel.create({ title: 'old title', content: 'old content', author: 'old authro' });
            const updatedData = {
                title: "new title",
                content: "new content",
                author: "new author"
            };

            const response = await request(app)
                .put(`/posts/${originalPost.id}`)
                .send(updatedData);

            expect(response.statusCode).toBe(200);
            expect(response.body.title).toBe(updatedData.title);
            expect(response.body.content).toBe(updatedData.content);
        });
    });

    describe('DELETE /posts/:id', () => {
        it('deve deletar um post existente', async () => {
            const postToDelete = await PostModel.create({ title: 'teste', content: 'teste', author: 'teste' });

            const deleteResponse = await request(app).delete(`/posts/${postToDelete.id}`);
            expect(deleteResponse.statusCode).toBe(200);
            expect(deleteResponse.body.id).toBe(postToDelete.id);

            const getResponse = await request(app).get(`/posts/${postToDelete.id}`);
            expect(getResponse.statusCode).toBe(404);
        });
    });
});

