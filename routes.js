const express = require("express");
const { color } = require("console-log-colors");
const { bgGreen } = color;
const swaggerDocument = require("./src/swagger/doc.json");
const { signupADM, loginADM } = require("./src/controllers/ADM");
const {
    createUser,
    loginUser,
    deleteUser,
    getIDCar,
    getPendency
} = require("./src/controllers/user");
const {
    createBook,
    updateBook,
    deleteBook,
    getBook,
    searchBook,
    setBook,
} = require("./src/controllers/book");

const {
    createLoan,
    getLoan,
    selectLoan,
    updateLoan,
    getLoans,
} = require("./src/controllers/loan");

const router = express.Router();

router.get("/api-docs/doc.json", (req, res) => {
    console.log(bgGreen("Doc"));
    res.json(swaggerDocument);
});

//ADM
router.post("/signupADM", signupADM);
router.post("/loginADM", loginADM);

//User
router.post("/signupUser", createUser);
router.post("/loginUser", loginUser);
router.delete("/deleteUser/:id", deleteUser);
router.get("/getPendency", getPendency);
router.get("/getIdCar/:id", getIDCar);

//Loan
router.post("/createLoan", createLoan);
router.get("/getLoan", getLoan);
router.get("/getLoans", getLoans);
router.get("/selectLoan/:id", selectLoan);
router.put("/updateLoan/:id", updateLoan);

//Book
router.post("/createBook", createBook);
router.put("/updateBook/:id", updateBook);
router.delete("/deleteBook/:id", deleteBook);
router.get("/getBook", getBook);
router.get("/searchBook/:title", searchBook);
router.get("/setBook/:id", setBook);

module.exports = { router };
