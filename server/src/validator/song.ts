import Joi from "joi";

function songValidator(songData: any){
    const schema = Joi.object({
        title: Joi.string().min(3).max(500).required(),
        cover: Joi.string().max(500).required(),
        url: Joi.string().min(3).max(500).required(),
        duration: Joi.number().min(0).required(),
        
        albumId: Joi.array().length(1),
        genreId: Joi.array().length(1),
        
        artistId: Joi.array().min(1),
        categoryAlbumId: Joi.array().min(1)
    })
    return schema.validate(songData)
}

export default songValidator