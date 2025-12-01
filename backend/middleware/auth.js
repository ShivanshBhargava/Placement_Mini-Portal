import jwt from "jsonwebtoken";

export const authenticateCompany = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  
  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, "MY_SECRET_KEY");
    req.company = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};