export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
// basically async functions jaha use kare hai for time taking functions. Agar unmein koi error hoti hai toh express ussey reliably handle nhi kar pata. Isiliye ye utility create kari hai. Toh ab jab bhi async function use kiya hai controllers mein instead of writing try catch, wrapped the fucntion inside this. 