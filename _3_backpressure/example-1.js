const fs = require('fs');
const http = require('http');
const {pipeline} = require('stream');

function main() {
    let server = http.createServer();
    server.on('request', (request, response) => {
        const data = fs.createReadStream('./big.file');
        pipeline(
            data,
            response,
            (err) => {
                if (err) {
                    console.error(`Oopsie: ${err}`);
                    server.close();
                } else {
                    console.log('Completing');
                }
            }
        )
    });

    server.listen(8000);
}

main();
