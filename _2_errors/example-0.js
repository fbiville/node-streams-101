const {PassThrough} = require('stream');
const AlwaysFailingSource = require('./failing-source');

function main() {
    const source = new AlwaysFailingSource();
    // PassThrough is a special built-in Transform implementation
    // each chunk from its Writable side will be exposed as-is
    // ... from the Readable side
    // (note: a Writable stream would have been enough in this example)
    const destination = new PassThrough();
    // let the data flow and see what happens!
    source.pipe(destination);
}

main();
