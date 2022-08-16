const express = require("express");
const { color } = require("console-log-colors");
const { bgGreen, bgMagenta, bgRed, bgYellow, bgCyan } = color;
const swaggerDocument = require("./src/swagger/doc.json");

const router = express.Router();

router.get("/api-docs/doc.json", (req, res) => {
    console.log(bgGreen("Doc"));
    res.json(swaggerDocument);
});

module.exports = { router };
