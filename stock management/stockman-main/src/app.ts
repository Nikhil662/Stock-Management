import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB";
import morgan from "morgan";
import helmet from "helmet";
import routes from "./routes/";
import cookieParser from "cookie-parser";

// environment variables
dotenv.config();

// Connect db
connectDB();

const app = express();

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// headers security
app.use(helmet());

// logging
app.use(morgan("dev"));

// routes
app.use("/auth", routes.auth);
app.use("/category", routes.category);
app.use("/product", routes.product);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`);
});
