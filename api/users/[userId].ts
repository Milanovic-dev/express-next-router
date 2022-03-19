export const get = (req, res) => {
  console.log(req.params);
  res.status(200).send(req.params.userId);
};
