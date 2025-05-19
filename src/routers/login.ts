import express from "express";
import { login } from "../controllers/loginController";
import { Request, Response, NextFunction } from "express";

const loginRoutes = express.Router();

loginRoutes.post("/login", (req: Request, res: Response, next: NextFunction) => {
    login(req, res).catch(next);
});

export default loginRoutes;
