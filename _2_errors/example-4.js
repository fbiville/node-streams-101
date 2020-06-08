const {pipeline, Readable} = require('stream');
const AlwaysFailingDestination = require('./failing-destination');

function onPipelineCompletion(err) {
    if (err) {
        console.error('If the error propagates downstream, ' +
            'we\'ll see this message');
    } else {
        console.log('Pipeline successfully completed');
    }
}

function main() {
    const source = Readable.from([{some: 'object'}]);
    const destination = new AlwaysFailingDestination();
    pipeline(
        source,
        // there could be many Duplex streams in between
        destination,
        // it exposes a completion callback function
        onPipelineCompletion
    )
}

main();
