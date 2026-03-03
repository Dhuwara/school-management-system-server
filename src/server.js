import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.config.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from './routes/authRoutes.js'
import studentRoutes from './routes/studentRoutes.js'
import staffRoutes from './routes/staffRoutes.js'
import counterRoutes from "./routes/counterRoutes.js";
import classRoutes from "./routes/classRoutes.js"
import subjectRoutes from "./routes/subjectRoutes.js"
import classMappingRoutes from './routes/classMappingRoutes.js'
import timetableRoutes from "./routes/timetableRoutes.js"
import classConifgRoutes from './routes/classConfigRoutes.js'
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, 
  }),
);

app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api", studentRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/counter", counterRoutes);
app.use("/api/class", classRoutes);
app.use("/api/subject", subjectRoutes);
app.use("/api/classmapping", classMappingRoutes);
app.use("/api/timetable", timetableRoutes);
app.use("/api/classconfig", classConifgRoutes);
 
const PORT = process.env.PORT || 5000;

connectDB()
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
