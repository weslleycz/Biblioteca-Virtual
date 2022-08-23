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
                    book: {
                        connect: books,
                    },
                },
            });
            return res.status(200).json({ data: data, has_error: false });
        } else {
            if (loan[0].startDate <= loan[0].endDate) {
                return res.status(400).json({
                    status: "Você deve devolver os livros emprestados antes de pegar novos.",
                    has_error: true,
                });
            } else {
                await prismaClient.loan.update({
                    where: {
                        id:loan[0].id
                    },
                    data: {
                        statusLoan:"Pendente"
                    },
                });
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

const updateLoan = async (req, res) => {
    console.log(bgGreen(req.method));
    try {
        const loan = await prismaClient.loan.findUnique({
            where: {
                id: req.params.id,
            },
        });
    
        if (loan.statusLoan === "Aguardando a retirada") {
            const update = await prismaClient.loan.update({
                where:{
                    id: req.params.id,
                },
                data: {
                    endDate: moment().add(10, "days").format(),
                    statusLoan: "Retirado",
                },
            });
            console.log(update);
            return res.status(200).json({ status: "update", has_error: false });
        } else if (loan.statusLoan != "Devolvido") {
            const update = await prismaClient.loan.update({
                where:{
                    id: req.params.id,
                },
                data: {
                    statusLoan: "Devolvido",
                },
            });
            const user = await prismaClient.user.update({
                where:{
                   id:update.userId
                },
                data:{
                    pendency:false,
                }
            })
            return res.status(200).json({ status: "update", has_error: false });
        } else {
            return res.status(400).json({
                status: "Este livro já foi devolvido",
                has_error: true,
            });
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

const getLoan = async (req, res) => {
    console.log(bgMagenta(req.method));
    const secret = process.env.secret || "GN8Mrz7EJC%3";
    try {
        const token = verify(req.headers.authorization, secret);
        const loan = await prismaClient.loan.findMany({
            where: {
                userId: token.data,
            },
        });
        return res.status(200).json({ data: loan, has_error: false });
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

const getLoans = async (req, res) => {
    console.log(bgMagenta(req.method));
    const secret = process.env.secret || "GN8Mrz7EJC%3";
    try {
        const token = verify(req.headers.authorization, secret);
        const loans = await prismaClient.loan.findMany({
            where:{
                userId: token.data,
            },
        });
        return res.status(200).json({ data: loans, has_error: false });
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

const selectLoan = async (req, res) => {
    console.log(bgYellow(req.method));
    const secret = process.env.secret || "GN8Mrz7EJC%3";
    try {
        const token = verify(req.headers.authorization, secret);
        const loan = await prismaClient.loan.findUnique({
            where: {
                id: req.params.id,
            },
            include:{
                book:{
                    where:{
                        loanId: req.params.id,
                    },
                    select:{
                        title:true,
                        cover:true,
                        id:true,
                    }
                }
            }
        });
        return res.status(200).json({ data: loan, has_error: false });
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

module.exports = { createLoan, getLoan, selectLoan, updateLoan ,getLoans};
