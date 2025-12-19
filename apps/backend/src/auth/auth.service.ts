import { prisma } from "../prisma";
import bcrypt from "bcrypt";
import { signAccessToken, signRefreshToken } from "./token.service";
import { AppError } from "../error/error";

export async function registerUser(email: string, password: string, name?: string) {
    
    const hashedPassword = await bcrypt.hash(password, 12);

    return await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name
        }
    });
}


export async function loginUser(email: string, password: string) {

    const user = await prisma.user.findUnique({where: {email}});
    if(!user) throw new AppError("Invalid Credentials", 403);

    const valid = await bcrypt.compare(password, user.password);
    if(!valid) throw new AppError("Invalid Credentials", 403);

    return {
        user, 
        accessToken: signAccessToken({userId: user.id, role: user.role}),
        refreshToken: signRefreshToken({userId: user.id})
    }

}