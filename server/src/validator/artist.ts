import Joi from "joi";

export default function artistValidator(data: { name: string, avatar: string, email: string }){
    const schema = Joi.object({
        name: Joi.string().min(3).max(500).required(),
        avatar: Joi.string().max(500).required(),
        email: Joi.string().email().min(3).max(500).required(),
    })
    return schema.validate(data)
}