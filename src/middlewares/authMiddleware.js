import jwt from "jsonwebtoken";

import { prisma } from "../config/db.js";

export const authMiddleware = async (req, res, next) => {
  // console.log("🍪 Cookie token:", req.cookies?.jwt);
  // console.log("🔑 Header token:", req.headers.authorization);
  let token;
  // ✅ Check cookie first (more secure)
  if (req.cookies?.jwt) {
    token = req.cookies.jwt;
    // Fallback to Bearer token (useful for mobile apps or API clients)
  } else if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized, first you have to login" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("decoded", decoded);

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      return res.status(401).json({ message: "User no longer exists" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in auth middleware:", error.message);
    res.status(401).json({ message: error.message });
  }
};
