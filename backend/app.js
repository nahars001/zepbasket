import express from "express";
import dbconnect from "./config/dbconnect.js";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";
import checkoutRoute from "./routes/checkoutRoute.js";
import adminRoute from "./routes/adminRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

let app = express();

app.use(express.urlencoded({ extended: true }));

const MODE = process.env.NODE_ENV;
const PORT = process.env.PORT || 8000;

if (MODE == "development") {
  dotenv.config({ path: "./backend/config/.env" });
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dbconnect();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/cart", checkoutRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/category", categoryRoute);
app.use(errorMiddleware);

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
}
app.use("/assets/img", express.static(path.join(__dirname, "./assets/img")));

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} in ${MODE} Mode`);
});
