/** 
 Wrappar en async funktion i ett promise för cleanare error handling. 
 Innebär att man inte behöver repetera error handling i varje controller
 källa till tricket
 https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
*/

export default fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}
