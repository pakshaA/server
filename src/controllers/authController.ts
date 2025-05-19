import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";


export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Заполните все поля" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ message: "Пользователь уже существует" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const defaultPhotoPath = "/public/assets/default-avatar.png"; 
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      photo: defaultPhotoPath,
      city: "",
      age: null,
    });

    await newUser.save();

    return res.status(201).json({
      message: "Пользователь успешно зарегистрирован",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        photo: newUser.photo,
        city: newUser.city,
        age: newUser.age,
      },
    });
  } catch (error) {
    console.error("Ошибка регистрации:", error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
};
