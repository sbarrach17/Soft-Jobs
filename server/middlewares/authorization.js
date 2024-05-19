const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send("Acceso denegado. Token no proporcionado.");

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "az_AZ");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Token inválido.");
  }
};

const logRequests = (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
};

module.exports = { verifyToken, logRequests };
