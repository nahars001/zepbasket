import userModel from "../models/userModel.js";
import errorHandler from "../utils/errorHandler.js";
import CatchAsyncError from "./CatchAsyncError.js";

const isAdmin = CatchAsyncError(async (req, res, next) => {
  const id = req.user._id;

  const user = await userModel.findById(id);

  if (user.role.includes("admin")) {
    return next();
  }
  next(new errorHandler("You dont have permession for this resource", 403));
});

export default isAdmin;
