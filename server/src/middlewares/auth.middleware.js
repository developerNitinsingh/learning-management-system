import ApiError from "../utils/error.util.js";
import jwt from "jsonwebtoken";

const isLoggedIn = async (req, res, next) => {
  const { token } = res.cookie;
  if (!token) {
    return next(new ApiError("Unaunthenticated , please log in again", 400));
  }

  const userDetails = await jwt.verify(token, process.env.JWT_SECRET);

  req.user = userDetails;

  next();
};

export { isLoggedIn };
