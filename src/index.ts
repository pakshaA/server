import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db";
import authRoutes from "./routers/auth";
import cors from "cors";
import cookieParser from "cookie-parser";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
connectDB();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true 
}));

app.use("/api", authRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
