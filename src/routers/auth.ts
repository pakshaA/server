import express from "express";
import { register } from "../controllers/authController";

const authRoutes = express.Router();

authRoutes.post("/register", (req, res, next) => {
    register(req, res).catch(next);
});

export default authRoutes;
