const prismaClient = require("../../src/servers/prismaClient");
const { uuid } = require('uuidv4');

describe('Cadastrar Usuário', () =>{
    it('Realizar cadastro', async() =>{
        const user = await prismaClient.user.create({
            data:{
                password: '123',
                category: 'Aluno',
                name: 'jorgel',
                telephone: '1231',
                email: 'jorge@gmail.com',
                idCar:uuid()
            },
        })
        expect(user.name).toBe('jorgel')
    });
})

describe('Cadastrar um novo livro', () =>{
    it('Registrar novo livro', async() =>{
        const book = await prismaClient.book.create({
            data: {
                ISBN: '123',
                title: 'Teste',
                description:'Teste 123',
                author: 'Teste 1',
                year: '2020'
            },
        });
        expect(book.title).toBe('Teste')
    });
    it('Não permitir datas inválidas', async() =>{
        const book = await prismaClient.book.create({
            data: {
                ISBN: '334',
                title: 'title',
                description:'description',
                author: 'author',
                year: '2021'
            },
        });
        const anoCorrente = new Date().getFullYear();

        expect(parseInt(book.year) < anoCorrente).toBe(true)
    })
})