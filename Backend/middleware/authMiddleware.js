const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid authorization header." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
     const user = await User.findById(decoded.id).select("_id name email");
    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }
    req.user = user;
    next();

  } catch (err) {
    console.error("Auth middleware error:", err.message);
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired. Please login again." });
    }
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};

module.exports = auth;
