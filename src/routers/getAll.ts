import express from "express";
import { getAllUsers } from "../controllers/getAllController";
import { Request, Response, NextFunction } from "express";

const getAllRoutes = express.Router();

getAllRoutes.get("/getAll", (req: Request, res: Response, next: NextFunction) => {
    getAllUsers(req, res).catch(next);
});

export default getAllRoutes;
