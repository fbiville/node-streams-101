const {Readable} = require('stream');

module.exports = class AlwaysFailingSource extends Readable {
    constructor() {
        super({objectMode: true});
    }
    // in object mode, `size` should be ignored
    // source: https://nodejs.org/api/stream.html#stream_readable_read_size
    _read(size) {
        // this is the way to signal an error within a Readable impl
        this.destroy(new Error('oopsie'));
    }
}
