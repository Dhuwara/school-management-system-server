import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.config.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api", userRoutes); 

const PORT = process.env.PORT || 5000;

connectDB()
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
