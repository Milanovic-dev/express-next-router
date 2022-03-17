export default {
  get: (req, res) => {
    res.send("Hi GET");
  },
  post: (req, res) => {
    res.send("Hi POST");
  },
  delete: (req, res) => {
    res.send("Hi DELETE");
  },
};
