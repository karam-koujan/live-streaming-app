
module.exports = Joi.object().keys({
    title:Joi.string(),
    tags: Joi.array().items(Joi.string()),
    streamLink:Joi.string().regex(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i).message("please give a valid url"),
    type:Joi.string(),
})