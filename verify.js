const fs = require('fs');
const crypto = require('crypto');
fs.readFile('result.json', function(err, buf) {
    const data = JSON.parse(buf.toString());
    const hash = crypto.createHash('sha512');
    const hashData = hash.update(data['file'], 'utf-8');
    const gen_hash = hashData.digest('hex');
    if (gen_hash === data['hash']) {
        console.log('INTACT');
    } else {
        console.log('DAMAGED');
    }
});