import { Request, Response } from "express";
import { loginUser, registerUser } from "./auth.service";
import { AppError } from "../error/error";

const cookieOptions = {
    httpOnly: true,
    secure: false, //temp 
    sameSite: 'lax' as const
}

export async function register(req: Request, res:Response) {

    const { email, password, name } = req.body;

    try {
        await registerUser(email, password, name);
        return res.status(201).json({message: "User successfully registered"});
    }catch(err) {
        if(err instanceof AppError) return res.status(err.statusCode).json({message: err.message});
    }


}

export async function login(req: Request, res: Response) {

    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({message: "Email and password required"});
    }

    try {

        const {accessToken, refreshToken} = await loginUser(email, password);

        res
        .cookie('acess_token', accessToken, {...cookieOptions, maxAge: 15 * 60 * 1000})
        .cookie('refresh_token', refreshToken, {...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000})
        .json({message: "Logged in"});

    }catch(err) {
        if (err instanceof AppError) return res.status(err.statusCode).json({message: err.message});
    }

}

export function logout(_req: Request, res: Response) {
    res.clearCookie('access_token').clearCookie('refresh_token').sendStatus(204);
}