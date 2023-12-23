import Joi from "joi"

export const usuarioRegisterSchema = Joi.object({
    email: Joi.string().email().required()
})

export const usuarioVerifycodeSchema = Joi.object({
    email: Joi.string().email().required().regex(/\uc\.cl$/),
    verifycode: Joi.number().min(10000).max(99999).required()
})
export const usuarioVerifyTokenSchema = Joi.object({
    token: Joi.string().required()
})