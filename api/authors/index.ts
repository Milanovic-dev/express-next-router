
export const post =
  (req, res) => {
    res.send("Successfull post");
  }


export const patch = [(req, res, next) => {
  req.custom = "CUSTOM"
  next()
}, (req, res) => {
  res.send(req.custom);
}]
