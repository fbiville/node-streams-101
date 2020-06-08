const SquareStream = require('./square-stream');
const slowIterator = require('./slow-iterator');
const {Readable} = require('stream');
const EchoStream = require('./echo-stream');

function main() {
    // create a Readable stream from a generator function
    const source = Readable.from(slowIterator([1, 2, 3]), {objectMode: true});
    // let's square these numbers
    // SquareStream is a custom Duplex implementation
    // it actually implements a specialization of Duplex called Transform
    const intermediate = new SquareStream();
    // custom writable stream implementation
    const destination = new EchoStream();

    // chunks will go from the `source` Readable
    // ... to the Writable side of the Duplex (Transform) `intermediate` stream, which will go
    // ... automatically to the Readable side of the `intermediate` stream, and
    // ... will finally go to the `destination` stream
    source
        .pipe(intermediate)
        .pipe(destination);
}

main();
