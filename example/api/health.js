module.exports = {
  get: [
    (req, res, next) => {
      req.user = { name: "Nikola" };
      next();
    },
    (req, res) => {
      console.log(req.user);
      res.status(200).send();
    },
  ],
};
