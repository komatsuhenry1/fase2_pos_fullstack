//PostModel
jest.mock("../config/supabaseClient", ()=> {
    const supabaseMock = {
        from: jest.fn(()=>supabaseMock),
        delete: jest.fn(()=> supabaseMock),
        neq: jest.fn(()=> supabaseMock),
        insert: jest.fn(()=> supabaseMock),
        select: jest.fn(()=> supabaseMock),
        update: jest.fn(()=> supabaseMock),
        eq: jest.fn(()=> supabaseMock),
        single: jest.fn(()=> supabaseMock),
        or: jest.fn(()=> supabaseMock)
    }

    return {supabase: supabaseMock}
})

const { supabase } = require('../config/supabaseClient');
const {PostModel} = require("./postModel")

describe("PostModel", ()=> {

    beforeEach(()=>{
        jest.clearAllMocks()
    })

    test("create() - Deve inserir um post e retornar o novo registro", async ()=>{

        const body = {
            title:"Titulo 01",
            content: "Conteudo",
            author: "autor 01"
        }

        const expected_data = {
                id:1,
                title:"Titulo 01",
                content: "Conteudo",
                author: "autor 01",
                created_at: "2025-10-07T16:11:00Z"
            }

        supabase.from.mockReturnThis()
        supabase.insert.mockReturnThis()
        supabase.select.mockResolvedValue({
            data:[expected_data],
            error: null
        })

        const response = await PostModel.create(body)

        expect(supabase.from).toHaveBeenCalledWith("posts")
        expect(supabase.insert).toHaveBeenCalledWith([body])
        expect(response).toEqual(expected_data)
    })

    test("create() Eror - Deve retornar um erro", async ()=>{

        const body = {
            title:"Titulo 01",
            content: "Conteudo",
            author: "autor 01"
        }

        const supabaseError = new Error("Erro ao criar o post")

        supabase.from.mockReturnThis()
        supabase.insert.mockReturnThis()
        supabase.select.mockResolvedValue({
            data: null,
            error: supabaseError
        })

        await expect(PostModel.create(body)).rejects.toThrow("Erro ao criar o post")
    })

    

    test("getAllPost() - Deve recuperar todos os posts", async ()=>{

        const fakeData = [
            {   id:1,
                title:"Titulo 01",
                content: "Conteudo",
                author: "autor 01",
                created_at: "2025-10-07T16:11:00Z"},
            {
                id:2,
                title:"Titulo 02",
                content: "Conteudo",
                author: "autor 02",
                created_at: "2025-10-07T16:11:00Z"
            }]

        supabase.from.mockReturnThis()
        supabase.select.mockResolvedValue({
            data:fakeData,
            error: null
        })

        const response = await PostModel.getAllPosts()

        expect(supabase.from).toHaveBeenCalledWith("posts")
        expect(supabase.select).toHaveBeenCalled()
        expect(response).toEqual(fakeData)
    })

    test("getAllPost() Error - Deve retornar um erro", async ()=>{

        const supabaseError = new Error("Erro ao selecionar os posts")

        supabase.from.mockReturnThis()
        supabase.select.mockResolvedValue({
            data: null,
            error: supabaseError
        })

        await expect(PostModel.getAllPosts()).rejects.toThrow("Erro ao selecionar os posts")


    })

    test("updatePost() - Deve atualizar um post e retornar o mesmo post atualizado", async ()=>{

        const id = "1"
        const body = {
            title: "Novo titulo 01",
            content: "Novo conteudo",
            author: "Novo autor"
        }

        const expected_data = {
            id: "1",
            ...body,
            created_at: "2025-10-07T16:11:00Z"
        }

        supabase.from.mockReturnThis()
        supabase.update.mockReturnThis()
        supabase.eq.mockReturnThis()
        supabase.select.mockResolvedValue({
            data: [expected_data],
            error: null
        })

        const response = await PostModel.updatePost(id, body)

        expect(supabase.from).toHaveBeenCalledWith('posts')
        expect(supabase.update).toHaveBeenCalledWith(body)
        expect(supabase.eq).toHaveBeenCalledWith("id", id)
        expect(supabase.select).toHaveBeenCalled()
        expect(response).toEqual(expected_data)

    })

    test("updatePost() Error - Deve retornar um erro", async ()=>{

        const supabaseError = new Error("Erro ao atualizar o post")

        supabase.from.mockReturnThis()
        supabase.update.mockReturnThis()
        supabase.eq.mockReturnThis()
        supabase.select.mockResolvedValue({
            data: null,
            error: supabaseError
        })

        await expect(PostModel.updatePost("1", {data: "data"})).rejects.toThrow("Erro ao atualizar o post")

    })

    test("deletePost() - Deve deletar um post e retornar o post deletado", async()=>{
        const id = "1"

        const expected_data = {
            id: "1",
            title: "Novo titulo 01",
            content: "Novo conteudo",
            author: "Novo autor",
            created_at: "2025-10-07T16:11:00Z"
        }

        supabase.from.mockReturnThis()
        supabase.delete.mockReturnThis()
        supabase.eq.mockReturnThis()
        supabase.select.mockResolvedValue({
            data: [expected_data],
            error: null
        })

        const response = await PostModel.deletePost(id)

        expect(supabase.from).toHaveBeenCalledWith('posts')
        expect(supabase.delete).toHaveBeenCalled()
        expect(supabase.eq).toHaveBeenCalledWith("id", id)
        expect(supabase.select).toHaveBeenCalled()
        expect(response).toEqual(expected_data)

    })


    test("deletePost() Error - Deve retornar um erro", async()=>{
        
        const supabaseError = new Error("Erro ao deletar um post")

        supabase.from.mockReturnThis()
        supabase.delete.mockReturnThis()
        supabase.eq.mockReturnThis()
        supabase.select.mockResolvedValue({
            data: null,
            error: supabaseError
        })

        await expect(PostModel.deletePost("1")).rejects.toThrow("Erro ao deletar um post")
    })

    test("getPostByString() - Deve retornar a pesquisa pela palavra", async ()=>{

        const params = "Titulo"
        const expected_data = {
            id: "1",
            title: "Novo titulo 01",
            content: "Novo conteudo",
            author: "Novo autor",
            created_at: "2025-10-07T16:11:00Z"
        }

        supabase.from.mockReturnThis()
        supabase.select.mockReturnThis()
        supabase.or.mockResolvedValue({
            data:[expected_data],
            error:null
        })

        const response = await PostModel.getPostByString(params)

        expect(supabase.from).toHaveBeenCalledWith('posts')
        expect(supabase.select).toHaveBeenCalled()
        expect(supabase.or).toHaveBeenCalledWith(`title.ilike.%${params}%,content.ilike.%${params}%,author.ilike.%${params}%`)
        expect(response).toEqual([expected_data])

    })

    test("getPostByString() Error - Deve retornar um erro", async ()=>{

        const params = "Titulo"
        
        const supabaseError = new Error("Erro ao pegar o post por palavra")

        supabase.from.mockReturnThis()
        supabase.select.mockReturnThis()
        supabase.or.mockResolvedValue({
            data:null,
            error:supabaseError
        })

        await expect(PostModel.getPostByString(params)).rejects.toThrow("Erro ao pegar o post por palavra")
    })



    test("deleteAll - Deve deletar todos os registros da tabela posts", async ()=>{
        
        supabase.from.mockReturnThis()
        supabase.delete.mockReturnThis()
        supabase.neq.mockReturnThis()

        await PostModel.deleteAll()

        expect(supabase.from).toHaveBeenCalledWith('posts')
        expect(supabase.delete).toHaveBeenCalled()
        expect(supabase.neq).toHaveBeenCalledWith('id', '00000000-0000-0000-0000-000000000000')
    })

    test("deleteAll Error - Deve retornar um erro", async ()=>{
        
        const supabaseError = new Error("Erro ao deletar os posts")
        supabase.from.mockReturnThis()
        supabase.delete.mockReturnThis()
        supabase.neq.mockResolvedValue({
            error: supabaseError
        })

        await expect(PostModel.deleteAll()).rejects.toThrow("Erro ao deletar os posts")


    })
})