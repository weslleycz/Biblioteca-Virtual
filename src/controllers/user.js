const prismaClient = require("../servers/prismaClient");
const { color } = require("console-log-colors");
const { crypyPassword } = require("../servers/crypyPassword");
const { encryptiPassword } = require("../servers/encryptiPassword");
const { verify } = require("jsonwebtoken");
const { sign } = require("jsonwebtoken");
const { bgGreen, bgMagenta, bgRed, bgYellow, bgCyan } = color;
const { uuid } = require('uuidv4');

const createUser = async (req, res) => {
    try {
        console.log(bgCyan(req.method));
        const { password, registration, category, name, telephone, email } =
            req.body;
        const data = await prismaClient.user.create({
            data: {
                password: crypyPassword(password),
                registration: registration,
                category: category,
                name: name,
                telephone: telephone,
                email: email,
                idCar:uuid()
            },
        });
        return res.status(200).json({ status: "create", has_error: false });
    } catch (error) {
        return res.status(500).json({ status: "error", has_error: true });
    }
};

const deleteUser = async (req, res) => {
    console.log(bgRed(req.method));
    const secret = process.env.secret || "GN8Mrz7EJC%3";
    try {
        const token = verify(req.headers.authorization, secret);
        const id = req.params.id;
        const user = await prismaClient.user.delete({
            where: {
                id: id,
            },
        });
        return res.status(200).json({ status: "delete", has_error: false });
    } catch (error) {
        if (error.code === undefined) {
            return res.status(300).redirect("/off");
        } else {
            return res.status(500).json({
                status: "Este usuario não está cadastrado",
                has_error: true,
            });
        }
    }
};

const getIDCar = async (req, res) => {
    console.log(bgMagenta(req.method));
    try {
        const secret = process.env.secret || "GN8Mrz7EJC%3";
        const token = verify(req.params.id, secret);
        const data = await prismaClient.user.findUnique({
            where: {
               id:token.data
            },
            select:{
                idCar:true
            }
        });
        return res.status(200).json({ data: data, has_error: false });
    } catch (error) {
        if (error.code === undefined) {
            return res.status(300).redirect("/off");
        } else {
            return res.status(500).json({
                status: "Este usuario não está cadastrado",
                has_error: true,
            });
        }   
    }
}

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

module.exports = { createUser, loginUser, deleteUser ,getIDCar};
