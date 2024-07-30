import errorHandler from "../utils/errorHandler.js";

const errorMiddleware = (err, req, res, next) => {
  let error = {
    statusCode: err.statusCode || 500,
    message: err.message || "Something Went Wrong",
  };

  if (err.code == "11000") {
    let message;
    if (err?.keyValue?.email) {
      message = `${err.keyValue.email} already exists`;
    }
    if (err?.keyValue?.phoneNo) {
      message = `${err?.keyValue?.phoneNo} already exists`;
    }
    error = new errorHandler(message, 400);
  }

  if (err.name === "ValidationError") {
    let message = Object.values(err.errors).map((val) => val.message);
    error = new errorHandler(message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    error = new errorHandler("Token not matched please login again", 400);
  }

  if (process.env.NODE_ENV == "development") {
    res.status(error.statusCode).json({
      message: error.message,
      stack: error.stack,
    });
  }
  if (process.env.NODE_ENV == "production") {
    res.status(error.statusCode).json({
      message: error.message,
    });
  }
};

export default errorMiddleware;
