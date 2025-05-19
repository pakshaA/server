import { Request, Response } from "express";

export const logout = (req: Request, res: Response) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });

    return res.status(200).json({ message: "Вы вышли из аккаунта" });
};
