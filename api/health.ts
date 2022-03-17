export const get = [
  (req, res, next) => {
    console.log("Health Middleware");
    next();
  },
  (req, res) => {
    res.status(200).send({ status: "ok" });
  },
];
