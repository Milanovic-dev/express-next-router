export default function middleware(req, res, next) {
  console.log("I'm root middleware");
  next();
}
