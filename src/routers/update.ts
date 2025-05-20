import express, { NextFunction, Request, Response } from "express";
import { updateUser } from "../controllers/updateContoller";

const updateRoutes = express.Router();

updateRoutes.put("/update", (req: Request, res: Response, next: NextFunction) => {
    updateUser(req, res).catch(next);
});


export default updateRoutes;
