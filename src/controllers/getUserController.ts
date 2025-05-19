import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const getUser = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Нет токена' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'devsecret') as { id: string };

        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ message: 'Ошибка при получении данных пользователя' });
    }
};
