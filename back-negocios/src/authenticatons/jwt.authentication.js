const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const token = req.headers["access-token"];
  if (!token) {
    return res.status(401).send({
      ok: false,
      message: "Sin token",
    });
  }
  //token = token.replace('Bearer ', ''
  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET_TEXT);
    req.token = token;
    req.user = decoded
    next();
  } catch (error) {
    console.log(error)
    if (error) {
      return res.status(401).send({
        ok: false,
        message: "Toket inválido",
      });
    }
  }
};

module.exports = isAuthenticated;
