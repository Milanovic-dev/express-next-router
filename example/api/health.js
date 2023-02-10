module.exports = {
  get: [
    (req, res, next) => {
      console.log("Middleware");
      next();
    },
    (req, res) => {
      console.log("Route handler");
      res.status(200).send('ok');
    },
  ],
};
