const prismaClient = require("../servers/prismaClient");
const { verify } = require("jsonwebtoken");
const { color } = require("console-log-colors");
const { bgGreen, bgMagenta, bgRed, bgYellow, bgCyan } = color;

const createBook = async (req, res) => {
    console.log(bgGreen(req.method));
    const secret = process.env.secret || "GN8Mrz7EJC%3";
    try {
        const token = verify(req.headers.authorization, secret);
        const { ISBN, title, author, year,url,description } = req.body;
        const data = await prismaClient.book.create({
            data: {
                ISBN: ISBN,
                title: title,
                description:description,
                author: author,
                year: year,
                aDMId: token.data,
                cover:url
            },
        });
        return res.status(200).json({ status: "create", has_error: false });
    } catch (error) {
        if (error.code === undefined) {
            return res.status(300).redirect("/off");
        } else {
            return res.status(500).json({
                status: "Esse livro já está cadastrado",
                has_error: true,
            });
        }
    }
};

const updateBook = async (req, res) => {
    console.log(bgYellow(req.method));
    const secret = process.env.secret || "GN8Mrz7EJC%3";
    try {
        const token = verify(req.headers.authorization, secret);
        const id = req.params.id;
        const data = req.body;
        const book = await prismaClient.book.update({
            where: {
                id: id,
            },
            data: {
                ...data,
            },
        });
        return res.status(200).json({ status: "update", has_error: false });
    } catch (error) {
        if (error.code === undefined) {
            return res.status(300).redirect("/off");
        } else {
            return res.status(500).json({
                status: "Este livro não está cadastrado",
                has_error: true,
            });
        }
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
            return res.status(300).redirect("/off");
        } else {
            return res.status(500).json({
                status: "Este livro não está cadastrado",
                has_error: true,
            });
        }
    }
};

const getBook = async (req, res) => {
    console.log(bgRed(req.bgMagenta));
    try {
        const data = await prismaClient.book.findMany();
        return res.status(200).json({ data: data, has_error: false });
    } catch (error) {
        return res.status(500).json({ status: "error", has_error: true });
    }
};

const searchBook = async (req, res) => {
    console.log(bgRed(req.bgMagenta));
    try {
        const title = req.params.title;
        const data = await prismaClient.book.findMany({
            where: {
                title: {
                    contains: title.toString(),
                },
            },
        });
        return res.status(200).json({ data: data, has_error: false });
    } catch (error) {
        return res.status(500).json({ status: "error", has_error: true });
    }
};

const setBook = async (req, res) => {
    console.log(bgRed(req.bgMagenta));
    try {
        const id = req.params.id;
        console.log(id);
        const data = await prismaClient.book.findUnique({
            where: {
                id:id
            },
        });
        return res.status(200).json({ data: data, has_error: false });
    } catch (error) {
        return res.status(500).json({ status: "error", has_error: true });
    }
};

module.exports = { createBook, updateBook, deleteBook, getBook, searchBook ,setBook};
