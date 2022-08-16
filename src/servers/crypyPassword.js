const CryptoJS = require("crypto-js");

const crypyPassword = (password) => {
    const encrypted = CryptoJS.AES.encrypt(password, "RFMW$e@7g5e9").toString();
    return encrypted
  };

  module.exports = {crypyPassword}