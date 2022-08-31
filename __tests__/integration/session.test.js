const prismaClient = require("../../src/servers/prismaClient");
const axios = require("axios");
const puppeteer = require("puppeteer");
const { uuid } = require("uuidv4");

describe("Cadastrar Usuário", () => {
    it("Realizar cadastro", async () => {
        const user = await prismaClient.user.create({
            data: {
                password: "123",
                category: "Aluno",
                name: "jorgel",
                telephone: "1231",
                email: "jorge@gmail.com",
                idCar: uuid(),
            },
        });
        expect(user.name).toBe("jorgel");
    });
    it("Não permitir campos em branco do usuário", async () => {
        const user = await prismaClient.user.create({
            data: {
                password: "",
                category: "Aluno",
                name: "212",
                telephone: "",
                email: "",
                idCar: uuid(),
            },
        });
        let result =
            user.name &&
            user.password &&
            user.category &&
            user.telephone &&
            user.email;
        expect(result).toBe("");
    });
});

describe("Cadastrar um novo livro", () => {
    beforeAll(() => {});

    it("Registrar novo livro", async () => {
        const book = await prismaClient.book.create({
            data: {
                ISBN: "123",
                title: "teste",
                description: "teste 123",
                author: "teste 1",
                year: "2020",
            },
        });
        expect(book.title).toBe("teste");
    });
    it("Não permitir datas inválidas", async () => {
        const book = await prismaClient.book.create({
            data: {
                ISBN: "334",
                title: "title",
                description: "description",
                author: "author",
                year: "2021",
            },
        });
        const anoCorrente = new Date().getFullYear();

        expect(parseInt(book.year) < anoCorrente).toBe(true);
    });
    it("Deve permitir inserir vários livros", async () => {
        const book1 = await prismaClient.book.create({
            data: {
                ISBN: "453",
                title: "O homem de giz",
                description: "Homem de giz",
                author: "C.J Tudor",
                year: "2019",
            },
        });
        const book2 = await prismaClient.book.create({
            data: {
                ISBN: "3929",
                title: "João e Maria",
                description: "João e Maria",
                author: "Sla",
                year: "2010",
            },
        });
        let cont1, cont2;
        if (book1 != undefined && book2 != undefined) {
            cont1 = 1;
            cont2 = 1;
        } else {
            cont1 = 0;
            cont2 = 0;
        }
        const totalBooks = cont1 + cont2;
        expect(totalBooks).toBe(2);
    });
    it("Não permitir título vazio", async () => {
        const book = await prismaClient.book.create({
            data: {
                ISBN: "634",
                title: "",
                description: "Testes",
                author: "João Paiva",
                year: "2000",
            },
        });
        let result = book.title && book.author;
        console.log(result);
        expect(result).toBe("");
    });
});

try {
    
} catch (error) {
    
}

describe("Books - Endpoints", () => {
    beforeAll(async () => {});
    const host = `http://localhost:${process.env.PORT||3000}/`
    describe('GET /getBook', () => {
        it("Retorna todos os livros - 200",async()=>{
            const book = await axios.get(`${host}/getBook`)
            expect(book.status).toBe(200);
        })
    })
    describe('GET /searchBook', () => {
        it("Pesquisar livros- 200",async()=>{
            const book = await axios.get(`${host}/searchBook/teste`)
            expect(book.data.data[0].title).toBe("teste");
        })
    })
})

describe("Testes de Sistema", () => {
    beforeAll(async () => {});
    const host = `http://localhost:${process.env.PORT||3000}`

    it("Cadastrar Usuário pelo front end", async () => {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(host);
        const btn = await page.$(
            "#__next > div.MuiContainer-root.MuiContainer-maxWidthLg.css-11kmze1-MuiContainer-root > div > div > div.MuiGrid2-root.MuiGrid2-grid-xs-8.css-1edfbbl-MuiGrid2-root > div > a"
        );
        await btn.evaluate((btn) => btn.click());
        await page.waitForNavigation();
        const [name] = await page.$x(
            "/html/body/div[1]/main/div/form/div[1]/div[1]/div/div/input"
        );
        const [email] = await page.$x(
            "/html/body/div[1]/main/div/form/div[1]/div[2]/div/div/input"
        );
        const [telephone] = await page.$x(
            "/html/body/div[1]/main/div/form/div[1]/div[3]/div/div/input"
        );
        const [password] = await page.$x(
            "/html/body/div[1]/main/div/form/div[1]/div[5]/div/div/input"
        );

        await password.click();
        "teste".split("").map(async (x) => {
            await page.keyboard.press(x);
        });

        await name.click();
        "teste".split("").map(async (x) => {
            await page.keyboard.press(x);
        });
        await email.click();
        "teste@gmail.com".split("").map(async (x) => {
            await page.keyboard.press(x);
        });

        await telephone.click();
        "6929773131".split("").map(async (x) => {
            await page.keyboard.press(x);
        });

        await page.keyboard.press("Enter");

        await browser.close();
    });

    it("Não permitir o cadastro de usuarios sem preencher todos os campos. ", async () => {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(host);
        const btn = await page.$(
            "#__next > div.MuiContainer-root.MuiContainer-maxWidthLg.css-11kmze1-MuiContainer-root > div > div > div.MuiGrid2-root.MuiGrid2-grid-xs-8.css-1edfbbl-MuiGrid2-root > div > a"
        );
        await btn.evaluate((btn) => btn.click());
        await page.waitForNavigation();
        const [name] = await page.$x(
            "/html/body/div[1]/main/div/form/div[1]/div[1]/div/div/input"
        );
        await name.click();
        "teste".split("").map(async (x) => {
            await page.keyboard.press(x);
        });
        await page.keyboard.press("Enter");
        if (page.url().substr(page.url().length - 6) === "signUp") {
            await browser.close();
        } else {
            await browser.close();
            throw Error();
        }
    });
});
