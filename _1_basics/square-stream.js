const {Transform} = require('stream');

module.exports = class SquareStream extends Transform {
    constructor() {
        super({objectMode: true});
    }

    // the stream operates in object mode, the encoding parameter is irrelevant
    _transform(chunk, encoding, callback) {
        // send the transformed chunk with callback
        // and signal its completion at the same time
        callback(null, chunk ** 2);
    }
}
