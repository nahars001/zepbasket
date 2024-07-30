import errorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import CatchAsyncError from "./CatchAsyncError.js";
import userModel from "../models/userModel.js";

const isAuthorized = CatchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new errorHandler("Please login", 401));
  }

  const isTokenMatched = jwt.verify(token, process.env.JWTSECRET);

  if (!isTokenMatched) {
    return next(new errorHandler(isTokenMatched.error, 400));
  }
  const user = await userModel.findOne({ email: isTokenMatched.email });

  if (!user) {
    return next(new errorHandler("Invaild token please login again", 400));
  }
  req.user = user;
  next();
});

export { isAuthorized };
