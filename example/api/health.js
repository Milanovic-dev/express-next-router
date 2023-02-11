
function loggerMiddleware(req, res, next) {
  console.log(req)
  console.log('Request: ', `[${new Date().toISOString()}]`, req.method, req.url)

  next()
}

module.exports = {
  get: [
    loggerMiddleware,
    (req, res) => {
      console.log("Route handler");
      res.status(200).send('ok');
    },
  ],
};
