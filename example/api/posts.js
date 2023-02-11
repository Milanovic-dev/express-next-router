module.exports = {
  get: (req, res) => {
    res
      .status(200)
      .send({
        posts: [{ name: "Post 1" }, { name: "Post 2" }, { name: "Post 3" }],
      });
  },
  post: (req, res) => {
    res.status(200).send("I'm POST");
  },
  patch: (req, res) => {
    res.status(200).send("I'm PATCH");
  },
};
