const postController = require('./postController')

jest.mock('../model/postModel', ()=> {
    const postModelMock = {
        create: jest.fn(()=> postModelMock),
        getAllPosts:jest.fn(()=> postModelMock),
        updatePost:jest.fn(()=> postModelMock),
        deletePost:jest.fn(()=> postModelMock),
        getPostById:jest.fn(()=> postModelMock),
        getPostByString:jest.fn(()=> postModelMock)
    }
    
    return {PostModel: postModelMock}
})

const {PostModel} = require("../model/postModel")

describe("PostController", ()=>{

    beforeEach(()=>{
        jest.clearAllMocks()
    })

    test("createPost - Deve criar um post corretamente", async ()=>{

        const req = {
            body:{
                title: "Titulo 01",
                content: "Conteudo 01",
                author: "Autor 01"
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json:jest.fn()
        }

        await postController.createPost(req, res)

        expect(PostModel.create).toHaveBeenCalledWith(req.body)
        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledTimes(1)
    })

    test("createPost Erro - Deve retornar o erro 400 com a falta de dados no body", ()=>{

        const req = {
            body:{
                title: "Titulo 01",
                content: "Conteudo 01"    
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json:jest.fn()
        }

        postController.createPost(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({
            error: 'Missing required fields: title, content and author are required'
        })
    })


    test("createPost Erro - Deve retornar o erro 500 pelo erro do servidor", async ()=>{

        const req = {
            body:{
                title: "Titulo 01",
                content: "Conteudo 01",
                author: "Autor 01"
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json:jest.fn()
        }

        PostModel.create.mockImplementation(()=>{
            throw new Error("Server Error")
        })

        await postController.createPost(req, res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({
            error: "Server Error"
        })
    })

    test("getAllPosts - Deve retornar todos os posts criados", async()=>{

        const req = {}

        const res = {
            status:jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await postController.getAllPosts(req, res)

        expect(res.json).toHaveBeenCalledTimes(1)
    })

    test("getAllPosts Erro - Deve retornar o erro 500 pelo servidor", async()=>{

        const req = {}

        const res = {
            status:jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        PostModel.getAllPosts.mockImplementation(()=>{
            throw new Error("Server Error")
        })

        await postController.getAllPosts(req, res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({
            error:"Server Error"
        })
    })

    test("updatePost - Deve atualizar os posts e retornar corretamente", async ()=>{

        const req = {
            params: {
            id: "1"},
            body: {
                title: "Novo titulo 01",
                content: "Novo conteudo 01",
                author: "Novo autor"
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await postController.updatePost(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledTimes(1)

    })

    test("updatePost - Deve retornar um erro 404 de post não encontrado", async ()=>{

        const req = {
            params:{
                id: "1"
            },
            body: {
                title: "Novo titulo 01",
                content: "Novo conteudo 01",
                author: "Novo autor"
            }
        }

        const res = {
            status:jest.fn().mockReturnThis(),
            json:jest.fn()
        }

        PostModel.updatePost.mockImplementation(()=>{
            return
        })

        await postController.updatePost(req, res)

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({
            error:'Post not found to update'
        })
    })

    test("updatePost - Deve retornar um erro 500 pelo servidor", async()=>{

        const req = {
            params:{
                id: "1"
            },
            body: {
                title: "Novo titulo 01",
                content: "Novo conteudo 01",
                author: "Novo autor"
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        PostModel.updatePost.mockImplementation(()=>{
            throw new Error("Server Error")
        })

        await postController.updatePost(req, res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({
            error: "Server Error"
        })
    })

    test("deletePost - Deve deletar um post", async()=>{

        const req = {
            params:{
                id:"1"
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await postController.deletePost(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledTimes(1)

    })

    test("deletePost - Deve retornar um erro 404 por não encontrar o post", async()=>{

        const req = {
            params: {
                id:"1"
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        PostModel.deletePost.mockImplementation(()=>{
            return
        })

        await postController.deletePost(req, res)

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({
            error: 'Post not found to delete'
        })

    })

        test("deletePost - Deve retornar um erro 500 pelo servidor", async()=>{

        const req = {
            params: {
                id:"1"
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        PostModel.deletePost.mockImplementation(()=>{
            throw new Error("Erro Server")
        })

        await postController.deletePost(req, res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({
            error: 'Erro Server'
        })

    })

    test("getPostById - Deve retornar um post pelo id", async()=>{

        const req = {
            params:{
                id:'1'
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await postController.getPostById(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledTimes(1)

    })

    test("getPostById - Deve retornar um erro 404 por não encontrar o post", async()=>{

        const req = {
            params:{
                id:'1'
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        PostModel.getPostById.mockImplementation(()=>{
            return
        })

        await postController.getPostById(req, res)

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({
            error: 'Post not found'
        })

    })

    test("getPostById - Deve retornar um erro 500 pelo servidor", async()=>{

        const req = {
            params:{
                id:'1'
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        PostModel.getPostById.mockImplementation(()=>{
            throw new Error("Error server")
        })

        await postController.getPostById(req, res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({
            error: 'Error server'
        })

    })

    test("getPostById - Deve retornar um erro 404 do erro PGRST116", async()=>{
        const req = {
            params:{
                id:'1'
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        const error = new Error("Post not found")
        error.code = "PGRST116"

        PostModel.getPostById.mockRejectedValue(error)

        await postController.getPostById(req, res)

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({
            error: "Post not found"
        })
    })

    test("getPostByString - Deve retornar o post de acordo com a pesquisa", async()=>{

        const req = {
            params:{
                string:"titulo"
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await postController.getPostByString(req, res)

        expect(res.json).toHaveBeenCalledTimes(1)

    })

    test("getPostByString - Deve retornar um erro 500 pelo servidor", async()=>{
        const req = {
            params:{
                string: "titulo"
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        PostModel.getPostByString.mockImplementation(()=>{
            throw new Error("Erro Server")
        })

        await postController.getPostByString(req, res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({
            error:"Erro Server"
        })
    })


})