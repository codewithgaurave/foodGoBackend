const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized! No token provided." });
  }

  try {
    const decoded = jwt.verify(token, "secret");
    const user = await User.findById(decoded.id);

    if (!user || user.token !== token) {
      return res.status(401).json({ message: "Invalid token!" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token expired or invalid!" });
  }
};

module.exports = { protect };
