import jwt from "jsonwebtoken";

export const verifyToken = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const token =
        req.cookies?.token ||
        req.headers.authorization?.split(" ")[1] ||
        req.headers.token;

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Please login",
        });
      }

      const decoded = jwt.verify(
        token,
        process.env.SECRETKEY
      );

      if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(decoded.role)
      ) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }

      req.user = decoded;
      next();

    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error.message
      });
    }
  };
};