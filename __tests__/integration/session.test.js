const prismaClient = require("../../src/servers/prismaClient");
const { uuid } = require('uuidv4');

describe('Cadastrar Usuário', () =>{
    it('Realizar cadastro', async() =>{
        const user = await prismaClient.user.create({
            data:{
                password: '123',
                category: 'Aluno',
                name: 'jorge',
                telephone: '1231',
                email: 'jorge@gmail.com',
                idCar:uuid()
            },
        })
        expect(user.name).toBe('jorge')
    })
})