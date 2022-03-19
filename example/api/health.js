module.exports = {
  get: [
    (req, res, next) => {
      req.user = { name: "Nikola" };
      next();
    },
    (req, res) => {
      console.log(req.user);
      console.log("Second");
      res.status(200).send();
    },
  ],
};
