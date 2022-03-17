export default function middleware(req, res, next) {
  console.log("Middleware");
  next();
}
