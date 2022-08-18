const express = require("express");
const { color } = require("console-log-colors");
const { bgGreen } = color;
const swaggerDocument = require("./src/swagger/doc.json");
const { signupADM, loginADM } = require("./src/controllers/ADM");
const{createUser,loginUser}= require("./src/controllers/user")
const {
    createBook,
    updateBook,
    deleteBook,
    getBook,
    searchBook,
} = require("./src/controllers/book");


const router = express.Router();

router.get("/api-docs/doc.json", (req, res) => {
    console.log(bgGreen("Doc"));
    res.json(swaggerDocument);
});

//ADM
router.post("/signupADM", signupADM);
router.post("/loginADM", loginADM);

//User
router.post("/signupUser",createUser);
router.post("/loginUser",loginUser);

//Book
router.post("/createBook", createBook);
router.put("/updateBook/:id", updateBook);
router.delete("/deleteBook/:id", deleteBook);
router.get("/getBook", getBook);
router.get("/searchBook/:title", searchBook);

module.exports = { router };
