export function middleware(req, res, next) {
  console.log("This is middleware");
  next();
}
