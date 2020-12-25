const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const token = req.headers["access-token"];
  if (!token) {
    return res.status(401).send({
      ok: false,
      message: "Sin token",
    });
  }
  //token = token.replace('Bearer ', '')
  jwt.verify(token, process.env.JWT_SECRET_TEXT, function (err, token) {
    if (err) {
      return res.status(401).send({
        ok: false,
        message: "Toket inválido",
      });
    } else {
      req.token = token;
      next();
    }
  });
};

module.exports = isAuthenticated;
