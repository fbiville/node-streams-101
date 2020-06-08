const range = require('./range');
const {PassThrough, Readable} = require('stream');
const EchoStream = require('../_1_basics/echo-stream');

const source = Readable.from(range(1, 10), {objectMode: true});
const middle = new PassThrough({highWaterMark: 1, objectMode: true});
const destination = new EchoStream();

// avoiding pipe and pipeline as they handle backpressure
// YOU SHOULD USE PIPE/PIPELINE IN PRODUCTION, DO NOT DO THIS!
// source: https://nodejs.org/en/docs/guides/backpressuring-in-streams/#lifecycle-of-pipe
middle.on('data', (chunk) => {
    destination.write(chunk);
})
source.on('data', (chunk) => {
    // write returns false if the Writable stream cannot keep up
    // similarly, internal Readable push calls return false
    console.log(`${middle.write(chunk)}`);
    // if (!middle.write(chunk)) {
    //     console.log('pause')
    //     source.pause();
    //     middle.once('drain', () => {
    //         console.log('resume');
    //         source.resume();
    //     })
    // }
});



