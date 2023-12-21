import { Router } from "express";
import {
    usuarioRegisterSchema,
    usuarioVerifycodeSchema,
    usuarioVerifyTokenSchema
} from "../../schema/auth.schema.js";
import { generateVerifyCode, sendEmail } from "../../util/email.js";
import { createToken, verifyToken } from "../../util/token.js";
const router = Router();
const EMAIL2VERIFYCODE = new Map();

router.post("/prelogin", async (req, res) => {
    const { error, value } = usuarioRegisterSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const codigo = generateVerifyCode();

    sendEmail(value.email, codigo);

    EMAIL2VERIFYCODE.set(value.email, [codigo, value]);

    setTimeout(() => {
        EMAIL2VERIFYCODE.delete(value.email);
        console.log(`${new Date()} | The code of: ${value.email} has been deleted`);
    }, 1000 * 60 * 5);

    res.status(200).json({
        message: "Ok",
    });
});

router.post("/realogin", async (req, res) => {
    const { error, value } = usuarioVerifycodeSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    if (!EMAIL2VERIFYCODE.has(value.email)) return res.status(404).json({
        message: "Email doesn't have verify code"
    })

    if (value.verifycode !== (+EMAIL2VERIFYCODE.get(value.email)[0])) return res.status(401).json({
        message: "verifycode not equal"
    })

    EMAIL2VERIFYCODE.delete(value.email);

    const token = createToken(value.email);


    res.status(200).json({
        token: token,
        message: "ok",
    });
});

router.post("/verify", async (req, res) => {
    const { error, value } = usuarioVerifyTokenSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const isAuth = verifyToken(value.token)

    if (!isAuth) return res.status(403).json({
        message: "Not auth"
    })

    res.status(200).json({
        message: "ok",
    });
});



export default router;