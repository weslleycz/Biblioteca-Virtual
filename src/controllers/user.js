const prismaClient = require("../servers/prismaClient");
const { color } = require("console-log-colors");
const { crypyPassword } = require("../servers/crypyPassword");
const { encryptiPassword } = require("../servers/encryptiPassword");
const { sign } = require("jsonwebtoken");
const { bgGreen, bgMagenta, bgRed, bgYellow, bgCyan } = color;

const createUser = async (req, res) => {
    try {
        console.log(bgCyan(req.method));
        const {
            password,
            registration,
            category,
            name,
            telephone,
            email,
        } = req.body;
        const data = await prismaClient.user.create({
            data: {
                password: crypyPassword(password),
                registration:registration,
                category:category,
                name:name,
                telephone:telephone,
                email:email,
            },
        });
        return res.status(200).json({ status: "create", has_error: false });
    } catch (error) {
        return res.status(500).json({ status: "error", has_error: true });
    }
};

const deleteBook = async (req, res) => {
    console.log(bgRed(req.method));
    const secret = process.env.secret || "GN8Mrz7EJC%3";
    try {
        const token = verify(req.headers.authorization, secret);
        const id = req.params.id;
        const book = await prismaClient.book.delete({
            where: {
                id: id,
            },
        });
        return res.status(200).json({ status: "delete", has_error: false });
    } catch (error) {
        if (error.code === undefined) {
            return res.status(300).redirect("/logoff");
        } else {
            return res.status(500).json({
                status: "Este livro não está cadastrado",
                has_error: true,
            });
        }
    }
};

const loginUser = async (req, res) => {
    const secret = process.env.secret || "GN8Mrz7EJC%3";
    try {
        console.log(bgCyan(req.method));
        const { password, email } = req.body;
        const data = await prismaClient.user.findUnique({
            where: {
                email: email,
            },
        });
        if (data !== null) {
            if (encryptiPassword(data.password) === password) {
                return res.status(200).json({
                    token: sign({ data: data.id }, secret, {
                        expiresIn: "24h",
                    }),
                    has_error: false,
                });
            } else {
                return res
                    .status(400)
                    .json({ status: "Senha incorreta!", has_error: true });
            }
        } else {
            return res
                .status(400)
                .json({ status: "Não registrado!", has_error: true });
        }
    } catch (error) {
        return res.status(500).json({ status: "error", has_error: true });
    }
};

module.exports ={createUser,loginUser}