module.exports = {
  get: (req, res) => {
    res.status(200).send("I'm GET");
  },
  post: (req, res) => {
    res.status(200).send("I'm POST");
  },
  patch: (req, res) => {
    res.status(200).send("I'm PATCH");
  },
};
