import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const checkMe = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Не авторизован" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "devsecret") as { id: string };
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        return res.status(200).json({
            message: "Авторизован",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                photo: user.photo
            }
        });
    } catch (error) {
        console.error("Ошибка авторизации:", error);
        return res.status(401).json({ message: "Неверный или просроченный токен" });
    }
};
