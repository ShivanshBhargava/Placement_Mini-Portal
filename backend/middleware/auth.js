import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  
  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, "MY_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

export const authenticateCompany = (req, res, next) => {
  authenticate(req, res, () => {
    if (req.user.userType !== "company") {
      return res.status(403).json({ error: "Company access required" });
    }
    req.company = req.user;
    next();
  });
};

export const authenticateStudent = (req, res, next) => {
  authenticate(req, res, () => {
    if (req.user.userType !== "student") {
      return res.status(403).json({ error: "Student access required" });
    }
    req.student = req.user;
    next();
  });
};