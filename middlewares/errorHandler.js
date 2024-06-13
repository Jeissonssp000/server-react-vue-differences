function errorHandler(err, req, res) {
  console.log(err);
  if (err.message) {
    if (err.message.includes("invalid")) {
      err.status = 400;
    } else if (err.message.includes("found")) {
      err.status = 404;
    }
  }

  res.status(err.status || 500).json({
    resp: false,
    msg: err.message || "Error desconocido",
  });
}

module.exports = errorHandler;
