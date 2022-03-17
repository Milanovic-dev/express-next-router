

export default {
  get: (req, res) => {
    res.send("Hello GET");
  },
  post: (req, res) => {
    res.send("Hello POST")
  },
  patch: (req, res) => {
    res.send("Hello PATCH")
  },
  delete: (req, res) => {
    res.send("Hello DELETE")
  },
}