const fs = require('fs');
const http = require('http');

function main() {
    let server = http.createServer();
    server.on('request', (request, response) => {
        fs.readFile('./big.file', (err, data) => {
            if (err) throw err;

            response.end(data);
        });
    });

    server.listen(8000);
}

main();
