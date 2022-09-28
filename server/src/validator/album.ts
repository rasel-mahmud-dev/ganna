import Joi from "joi";
import Album from "../models/Album";

export default async function albumValidatorAsync(data: { name: string, cover: string, artistIds: number[] }){
    return new Promise<any>(async (resolve, reject)=>{
        const schema = Joi.object({
            name: Joi.string().min(3).max(500).required().custom(function (value, helpers){
                return Album.findOne({ name: value })
                .then(doc=>{
                    if(doc) throw new Error("Duplicate name");
                    return value
                })
            }),
            
            artistIds: Joi.array().min(1).required(),
            cover: Joi.string().optional(),
        
        })
        let a;
        try {
            a = await schema.validateAsync(data);
            if(a.name  instanceof Promise) {
                await a.name;
            }
      
        } catch (ex: any){
            resolve({
                error: {
                    details: [
                        { message: ex.message}
                    ]
                }
            })
        }
        
    })
}