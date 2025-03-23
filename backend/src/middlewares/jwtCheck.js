import jwt from "jsonwebtoken";

const jwtCheck = (req, res, next) => {
  // console.log("Cookies:", req.cookies); // Debugging line

  const token = req.cookies?.token;

  // Check if token is present
  if (!token) {
    return res.status(401).json({ message: "Unauthorized - no token found" });
  }

  try {
    // Verify token and extract user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized - token expired" });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default jwtCheck;
