const {Writable} = require('stream');

module.exports = class EchoStream extends Writable {
    constructor() {
        super({objectMode: true});
    }

    // the stream operates in object mode, the encoding parameter is irrelevant
    _write(chunk, encoding, callback) {
        // simply print out the chunk
        console.log(chunk);
        // signals that the processing of the chunk is done
        // it has to be called **exactly once**!
        callback(null, chunk);
    }
}
