const {pipeline, PassThrough} = require('stream');
const AlwaysFailingSource = require('./failing-source');

function onPipelineCompletion(err) {
    if (err) {
        console.error('If the error propagates downstream, ' +
            'we\'ll see this message');
    } else {
        console.log('Pipeline successfully completed');
    }
}

function main() {
    const source = new AlwaysFailingSource();
    const destination = new PassThrough();
    source.on('error', (err) => {
        console.error(`Oh no! The following error happened: ${err}`);
    });
    // let the data flow with the built-in `pipeline` function
    // prior to Node 10, this was called `pump`
    pipeline(
        source,
        // there could be many Duplex streams in between
        destination,
        // it exposes a completion callback function
        onPipelineCompletion
    )
}

main();
