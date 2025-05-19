import express from "express";
import { getUser } from "../controllers/getUserController";
import { Request, Response, NextFunction } from "express";

const getUserRoutes = express.Router();

getUserRoutes.post("/getUser", (req: Request, res: Response, next: NextFunction) => {
    getUser(req, res).catch(next);
});

export default getUserRoutes;
