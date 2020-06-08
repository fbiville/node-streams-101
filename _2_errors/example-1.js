const {PassThrough} = require('stream');
const AlwaysFailingSource = require('./failing-source');

function main() {
    const source = new AlwaysFailingSource();
    const destination = new PassThrough();
    // the error handler needs to be registered
    // ... *before* data starts flowing
    // ... i.e. before `pipe` is called
    source.on('error', (err) => {
        console.error(`Oh no! The following error happened: ${err}`);
    });
    destination.on('error', () => {
        console.error('If the error propagates downstream, ' +
            'we\'ll see this message');
    });
    // let the data flow and see what happens!
    source.pipe(destination);
}

main();
