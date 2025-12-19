import jwt from "jsonwebtoken";

export function signAccessToken(payload: object) {

    const JWT_ACCESS_SECRET =  process.env.JWT_ACCESS_SECRET as string;

    return jwt.sign(
        payload, JWT_ACCESS_SECRET, {
            expiresIn: "15m"
        }
    );
}

export function signRefreshToken(payload: object) {
    
    const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

    return jwt.sign(payload, JWT_REFRESH_SECRET, {
        expiresIn: "7d"
    });
}

export function verifyAccessToken(token: string) {

    const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
    return jwt.verify(token, JWT_ACCESS_SECRET);
}