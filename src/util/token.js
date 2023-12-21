import jwt from "jsonwebtoken"
import 'dotenv/config'

export const createToken = (email) => {

    const token = jwt.sign({ sub: email },
        process.env.JWT_SECRET,
        {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
        });
    return token
}
export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return true;
    } catch (err) {
        console.error("Error al verificar el token:", err.message);
        return false;
    }
}