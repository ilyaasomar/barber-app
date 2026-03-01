import jwt from "jsonwebtoken";
export const generateToken = (userId, res) => {
  const payload = { id: userId };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });

  // this checks if production or development
  const isProd = process.env.NODE_ENV === "production";

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: isProd ? true : false,
    sameSite: isProd ? "none" : "lax",
    path: "/",
    maxAge: 1000 * 60 * 60 * 24, //1 days
    // maxAge: 1000 * 30,
  });

  return token;
};
