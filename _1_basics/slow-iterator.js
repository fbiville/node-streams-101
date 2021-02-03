// generator function that waits before generating each element
// if an element is 2, the function will wait for roughly 2 seconds
// ... before generating it
module.exports = async function* (elements) {
    for (const element of elements) {
        yield await new Promise((resolve) => {
            const pauseInMilliseconds = element * 1000;
            setTimeout(() => {
                resolve(element);
            }, pauseInMilliseconds);
        });
    }
}
