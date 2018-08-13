var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject('Arguments must be numbers');
            }
        }, 1500);
    });
};

asyncAdd(5, 7).then((result) => {
    console.log('Result:', result);
}, (errorMessage) => {
    console.log(errorMessage);
});

// var somePromise = new Promise((resolve, reject) => {
//     setTimeout(() => {     
//         //resolve('Hurray! It rocks!');
//         reject('Unable to fulfill promise');
//     }, 3000);
// });

// somePromise.then((message) => {
//     console.log('Success:', message);
// }, (errorMessage) => {
//     console.log('Error:', errorMessage);
// });