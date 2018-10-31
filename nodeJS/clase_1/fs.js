const fs = require('fs');

fs.readFile('./datos.txt', 'utf8', (err, data) => {
    if (err) return;
    console.log(data);
})