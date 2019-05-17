const fs = require('fs');
const crypto = require('crypto');
fs.readFile('data.txt', function(err, buf) {
    const content = buf.toString();
    const hash = crypto.createHash('sha512');
    const data = hash.update(content, 'utf-8');
    const gen_hash = data.digest('hex');
    fs.writeFile('result.json', JSON.stringify({
        'file': content,
        'hash': gen_hash
    }), (err) => {});
});
