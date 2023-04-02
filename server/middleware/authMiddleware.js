import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
const protect = expressAsyncHandler(async (req, res, next) => {
  let token = null;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.body.userId = decoded.id;
      //   console.log("decoded", decoded);
      //   console.log("token", token);
      next();
    } catch (err) {
      res.send({ message: "Not Authorized , Invalid Token", success: false });
    }
  }
  if (!token) {
    res.send({ message: "No Token", success: false });
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as an Admin");
  }
};
export { protect, admin };
