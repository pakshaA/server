import express from "express";
import { getAllUsers } from "../controllers/getAllController";
import { Request, Response, NextFunction } from "express";

const authRoutes = express.Router();

authRoutes.post("/getAll", (req: Request, res: Response, next: NextFunction) => {
    getAllUsers(req, res).catch(next);
});

export default authRoutes;
