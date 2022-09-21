const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require('../config');

const fetchuser = (req, res, next) => {
  const token = req.header("authToken");
  if (!token)
    res.status(401).json({ error: "Authenticate using correct token" });
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data;
    next();
  } catch (error) {
    res.status(401).json({ error: "Authenticate using correct token" });
  }
};
module.exports = fetchuser;