const {Readable} = require('stream');
const EchoStream = require('./echo-stream');

function main() {
    // create a Readable stream from a finite array
    const source = Readable.from([1, 2, 3, 4], {objectMode: true});
    // custom writable stream implementation
    const destination = new EchoStream();

    // call to `pipe` will trigger the Readable flowing mode
    // and chunks will "transit" to the destination stream
    source.pipe(destination);
}

main();
