const {Writable} = require('stream');

module.exports = class AlwaysFailingDestination extends Writable {

    constructor() {
        super({objectMode: true});
    }

    _write(chunk, encoding, callback) {
        callback(new Error('oopsie'));
    }
}
