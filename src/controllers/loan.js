const prismaClient = require("../servers/prismaClient");
const { verify } = require("jsonwebtoken");
const { color } = require("console-log-colors");
const { bgGreen, bgMagenta, bgRed, bgYellow, bgCyan } = color;
const moment = require("moment");

const createLoan = async (req, res) => {
    console.log(bgGreen(req.method));
    const secret = process.env.secret || "GN8Mrz7EJC%3";
    try {
        const { books } = req.body;
        const token = verify(req.headers.authorization, secret);
        const loan = await prismaClient.loan.findMany({
            where: {
                userId: token.data,
            },
        });
        if (loan[0] === undefined || loan[0].statusLoan === "Devolvido") {
            const data = await prismaClient.loan.create({
                data: {
                    userId: token.data,
                    statusLoan: "Aguardando a retirada",
                    startDate: moment().format(),
                    endDate: moment().add(10, "days").format(),
                    book: {
                        connect: books,
                    },
                },
            });
            return res.status(200).json({ status: "create", has_error: false });
        } else {
            if (loan[0].startDate <= loan[0].endDate) {
                return res.status(400).json({
                    status: "Você deve devolver os livros emprestados antes de pegar novos.",
                    has_error: true,
                });
            } else {
                await prismaClient.user.update({
                    where: {
                        id: token.data,
                    },
                    data: {
                        pendency: true,
                    },
                });
                return res.status(400).json({
                    status: "Você deve devolver os livros emprestados antes de pegar novos.",
                    has_error: true,
                });
            }
        }
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

module.exports = { createLoan };
