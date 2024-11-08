import { db } from "../db.js"
import { z } from "zod"


const bookSchema = z.object({
    nome: z.string().min(1, {message: "O nome é obrigatório"}),
    preco: z.string().trim().min(1, {message: "O preco é obrigatório"}),
    descricao: z.string().trim().min(1, {message: "A descricao é obrigatório"}),
    estoque: z.string().trim().min(1, {message: "O estoque é obrigatório"}),
    total: z.string().trim().min(1, {message: "O valor totao é obrigatório"}),
})


export const getProduto = (request, response) => {

    const query = "SELECT * FROM produtos"

    db.query(query, (error, data) => {
        if(error){
            return response.json(error)
        }
        return response.status(200).json(data)
    })
}

export const addProduto = (request, response) => {

    const validation = bookSchema.safeParse(request.body);

    if(validation.success == false){
        return response.status(400).json("Foi barrado na minha validação")
    }

    const query = "INSERT INTO produtos(`titulo`, `autor`, `editora`) VALUES (?)"

    const values = [
        validation.data.nome,
        validation.data.preco,
        validation.data.descricao,
        validation.data.estoque,
        validation.data.total,
    ]

    db.query(query, [values], (error) => {
        if(error){
            return response.json(error)
        }

        return response.status(200).json("Produto cadastrado com sucesso!")
    })
}

export const updateProduto = (request, response) => {

    const validation = bookSchema.safeParse(request.body)

    if(!validation.success){
        return response.status(400).json(validation.error.issues)
    }

    const query = "UPDATE produtos SET `titulo` = ?, `autor` = ?, `editora` = ? WHERE `id` = ?";

    const values = [
        validation.data.titulo,
        validation.data.autor,
        validation.data.editora
    ]

    db.query(query, [...values, request.params.id], (error) => {
        if(error) {
            return response.json(error)
        }

        response.status(200).json("Livro atualizado com sucesso!")
    })
}

export const deleteProduto = (request, response) => {

    const query = "DELETE from produtos WHERE `id`= ?";

    db.query(query, [request.params.id], (error) => {
        if(error){
            return response.status(500).json(error)
        }

        return response.status(200).json("Produto deletado com sucesso!")
    })

}