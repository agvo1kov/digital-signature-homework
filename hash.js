const fs = require('fs');
const crypto = require('crypto');
const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 512});
const JSEncrypt = require('node-jsencrypt');

fs.writeFile('./public.key', key.exportKey('public'), (err) => {});
fs.writeFile('./private.key', key.exportKey('private'), (err) => {});

fs.readFile('data.txt', function(err, buf) {
    const content = buf.toString();
    const hash = crypto.createHash('sha1');
    const data = hash.update(content, 'utf8');
    const gen_hash = data.digest('hex');
    fs.writeFile('result.json', JSON.stringify({
        'file': content,
        'signature': key.encrypt(gen_hash, 'base64', 'base64')
    }), () => {});
});
