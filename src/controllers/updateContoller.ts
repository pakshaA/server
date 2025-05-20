import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";

export const updateUser = async (req: Request, res: Response) => {
    try {
        const token = req.cookies?.accessToken;

        if (!token) {
            return res.status(401).json({ message: "Нет токена авторизации" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

        const userId = decoded.id;

        const { name, surname, gender, age, city, avatar } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, surname, gender, age, city, avatar },
            { new: true } 
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        res.status(200).json({ message: "Данные обновлены", user: updatedUser });

    } catch (error) {
        console.error("Ошибка обновления пользователя:", error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};
