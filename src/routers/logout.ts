import express from "express";
import { logout } from "../controllers/logoutController";
import { Request, Response } from "express";

const logoutRoutes = express.Router();

logoutRoutes.post("/logout", (req: Request, res: Response) => {
    logout(req, res);
});

export default logoutRoutes;
