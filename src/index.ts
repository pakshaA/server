import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db";
import authRoutes from "./routers/auth";
import loginRoutes from "./routers/login";
import cors from "cors";
import cookieParser from "cookie-parser";
import meRoutes from "./routers/me";
import logoutRoutes from "./routers/logout";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.use(express.json());
app.use(cookieParser());
connectDB();

app.use(cors({
    origin: "https://findlove-ochre.vercel.app",
    credentials: true 
}));

app.use("/api", authRoutes);
app.use("/api", loginRoutes);
app.use("/api", meRoutes);
app.use("/api", logoutRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
