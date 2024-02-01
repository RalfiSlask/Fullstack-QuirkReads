const CryptoJS = require('crypto-js');

const getEncryptedData = (data, saltKey) => {
  return CryptoJS.AES.encrypt(data, saltKey).toString();
};

const getDecryptedData = (encryptedData, saltKey) => {
  return (decryptedPassword = CryptoJS.AES.decrypt(
    encryptedData,
    saltKey
  ).toString(CryptoJS.enc.Utf8));
};

module.exports = {
  getDecryptedData,
  getEncryptedData,
};
