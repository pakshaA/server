import express, { NextFunction, Request, Response } from "express";
import { checkMe } from "../controllers/isAuthController";

const meRoutes = express.Router();

meRoutes.get("/me", (req: Request, res: Response, next: NextFunction) => {
    checkMe(req, res).catch(next);
});


export default meRoutes;
