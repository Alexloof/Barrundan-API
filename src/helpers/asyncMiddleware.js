/**
 Wrappar en async funktion i ett promise för cleanare error handling.
 Innebär att man inte behöver repetera error handling i varje controller
 källa till tricket
 https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
*/

export default function asyncErrorCatcher(fn) {
    if (!(fn instanceof Function)) {
        throw new Error('Must supply a function');
    }

    return (req, res, next) => {
        const promise = fn(req, res, next);
        if (!promise.catch) return;
        promise.catch(err => next(err));
    };
}
