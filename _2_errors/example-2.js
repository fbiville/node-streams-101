const {finished, PassThrough} = require('stream');
const AlwaysFailingSource = require('./failing-source');

function main() {
    const source = new AlwaysFailingSource();
    const destination = new PassThrough();
    // let's observe what happens with the built-in `finished` function
    // ... when source completes (successfully or not)
    finished(source, (err) => {
        if (err) {
            console.error('If the error propagates downstream, ' +
                'we\'ll see this message');
        } else {
            console.log('Source successfully completed');
        }
    });
    // let the data flow and see what happens!
    source.pipe(destination);
}

main();
