import express from "express";
import { register } from "../controllers/authController";
import { Request, Response, NextFunction } from "express";

const authRoutes = express.Router();

authRoutes.post("/register", (req: Request, res: Response, next: NextFunction) => {
    register(req, res).catch(next);
});

export default authRoutes;
