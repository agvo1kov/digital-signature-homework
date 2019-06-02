const fs = require('fs');
const crypto = require('crypto');
const NodeRSA = require('node-rsa');
// const JSEncrypt = require('node-jsencrypt');

fs.readFile('result.json', function(err, buf) {
    const data = JSON.parse(buf.toString());
    const hash = crypto.createHash('sha1');
    const hashData = hash.update(data['file'], 'utf8');
    const gen_hash = hashData.digest('hex');

    fs.readFile('./private.key', (err, buf) => {
        const privateKey = buf.toString();
        const key = new NodeRSA(privateKey);
        const decrypted = key.decrypt(data['signature'], 'base64');
        if (decrypted === gen_hash) {
            console.log('INTACT');
        } else {
            console.log('DAMAGED');
        }
    });
});