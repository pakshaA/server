import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";


export const login = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Заполните все поля" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Неверный email или пароль" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Неверный email или пароль" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "devsecret", { expiresIn: "7d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: "Пользователь успешно авторизован",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Ошибка авторизации:", error);
        return res.status(500).json({ message: "Ошибка сервера" });
    }
}
    