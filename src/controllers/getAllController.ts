import { Request, Response } from "express";
import User from "../models/User";

export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find({
            gender: { $exists: true, $ne: "" },
            city: { $exists: true, $ne: "" },
            age: { $exists: true, $ne: null },
            username: { $exists: true, $ne: "" },
            surname: { $exists: true, $ne: "" },
            photo: { $exists: true }
        });

        res.status(200).json({ users });
    } catch (error) {
        console.error("Ошибка при получении пользователей:", error);
        res.status(500).json({ message: "Ошибка сервера при получении пользователей" });
    }
};
