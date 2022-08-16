const express = require("express");
const { color } = require("console-log-colors");
const { bgGreen, bgMagenta, bgRed, bgYellow, bgCyan } = color;
const swaggerDocument = require("./src/swagger/doc.json");
const { signupADM, loginADM } = require("./src/controllers/ADM");
const {createBook,updateBook,deleteBook,getBook} = require("./src/controllers/book");

const router = express.Router();

router.get("/api-docs/doc.json", (req, res) => {
    console.log(bgGreen("Doc"));
    res.json(swaggerDocument);
});

//ADM
router.post("/signupADM", signupADM);
router.post("/loginADM", loginADM);

//Book
router.post("/createBook", createBook);
router.put("/updateBook", updateBook);
router.delete("/deleteBook", deleteBook);
router.get("/getBook", getBook);

module.exports = { router };
