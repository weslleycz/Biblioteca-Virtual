const prismaClient = require("../servers/prismaClient");
const { crypyPassword } = require("../servers/crypyPassword");
const { encryptiPassword } = require("../servers/encryptiPassword");
const { sign } = require("jsonwebtoken");
const { color } = require("console-log-colors");

const { bgGreen, bgMagenta, bgRed, bgYellow, bgCyan } = color;

const signupADM = async (req, res) => {
    try {
        console.log(bgCyan(req.method));
        const { password, username } = req.body;
        const data = await prismaClient.aDM.create({
            data: {
                username: username,
                password: crypyPassword(password),
            },
        });
        return res.status(200).json({ status: "create", has_error: false });
    } catch (error) {
        return res.status(500).json({ status: "error", has_error: true });
    }
};

const loginADM = async (req, res) => {
    const secret = process.env.secret || "GN8Mrz7EJC%3";
    try {
        console.log(bgCyan(req.method));
        const { password, username } = req.body;
        const data = await prismaClient.aDM.findUnique({
            where: {
                username: username,
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

module.exports = { signupADM, loginADM };
