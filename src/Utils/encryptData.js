// import CryptoJS from 'crypto-js';

// export const encryptData = (data) => {
//     const secretKey = process.env.REACT_APP_ENCRYPT_KEY; 
//     return CryptoJS.AES.encrypt(data.toString(), secretKey).toString();
// };

// export const decryptData = (ciphertext) => {
//     const secretKey = process.env.REACT_APP_ENCRYPT_KEY; 
//     const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
//     const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    
//     return decryptedData;
// };
import CryptoJS from 'crypto-js';

export const encryptData = (data) => {
    const secretKey = process.env.REACT_APP_ENCRYPT_KEY; 
    const encryptedData = CryptoJS.AES.encrypt(data.toString(), secretKey).toString(); 
     const hexString = CryptoJS.enc.Base64.parse(encryptedData).toString(CryptoJS.enc.Hex);

    return hexString;
};

export const decryptData = (hexString) => {
    const secretKey = process.env.REACT_APP_ENCRYPT_KEY; 
     const base64String = CryptoJS.enc.Hex.parse(hexString).toString(CryptoJS.enc.Base64); 
    const bytes = CryptoJS.AES.decrypt(base64String, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    
    return decryptedData;
};

