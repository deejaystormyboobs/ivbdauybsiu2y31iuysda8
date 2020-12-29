const config = require('./config');
const crypto = require('crypto');

function md5(data){
    return crypto.createHash('md5').update(data).digest();
}

const senha = config.PASSWORD;
const senha_md5 = md5(senha);

const key = Buffer.concat([ senha_md5, senha_md5.slice(0, 8) ]); // properly expand 3DES key from 128 bit to 192 bit

function criptografar(message){
    const cipher = crypto.createCipheriv('des-ede3', key, '');
    const encrypted = cipher.update(message, 'utf8', 'base64');
  
    return encrypted + cipher.final('base64');
}

function descriptografar(message){
    const cipher = crypto.createDecipheriv('des-ede3', key, '');
    const encrypted = cipher.update(message, 'base64', 'utf8');
  
    return encrypted + cipher.final('utf8');
}

module.exports = {
    criptografar,
    descriptografar
};