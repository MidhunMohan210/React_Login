import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import userRoutes from "./routes/userRoute.js";
import adminRoutes from './routes/adminRoute.js'
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

connectDB();
const port = process.env.PORT || 5000;

const app = express();

app.use(errorHandler); // Error handling middleware
app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cookieParser());
app.use(express.static('backend/Public'));


app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFound);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
