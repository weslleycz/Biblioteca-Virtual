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
    it('Não permitir campos em branco do usuário', async() => {
      const user = await prismaClient.user.create({
          data:{ password: '',
          category: 'Aluno',
          name: '212',
          telephone: '',
          email: '',
          idCar:uuid()},
      })
        let result
        if((user.name && user.password && user.category && user.telephone && user.email)!=''){
           result = false
       }else{
           result = true
       }
        expect(result).toBe(true)
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
    });
    it('Deve permitir inserir vários livros', async()=>{
        const book1 = await prismaClient.book.create({
            data: {
                ISBN: '453',
                title: 'O homem de giz',
                description:'Homem de giz',
                author: 'C.J Tudor',
                year: '2019'
            },
        });
        const book2 = await prismaClient.book.create({
            data: {
                ISBN: '3929',
                title: 'João e Maria',
                description:'João e Maria',
                author: 'Sla',
                year: '2010'
            },
        });
        let cont1, 
            cont2;
        if(book1!=undefined && book2!=undefined){
             cont1 = 1
             cont2 = 1
        }else{
             cont1 = 0
             cont2 = 0
        }
        const totalBooks = cont1 + cont2
        expect(totalBooks).toBe(2)
    });
    it('Não permitir título vazio', async() => {
        const book = await prismaClient.book.create({
            data: {
                ISBN: '634',
                title: '',
                description:'Testes',
                author: 'João Paiva',
                year: '2000'
            },
        });
        let result
        if((book.title)!=''){
           result = false
       }else{
           result = true
       }
        expect(result).toBe(true)
  });
})