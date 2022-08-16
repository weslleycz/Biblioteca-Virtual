const CryptoJS = require("crypto-js");

const encryptiPassword = (password) => {
    const decrypted = CryptoJS.AES.decrypt(password, "RFMW$e@7g5e9");
    return decrypted.toString(CryptoJS.enc.Utf8);
};

module.exports = { encryptiPassword };
