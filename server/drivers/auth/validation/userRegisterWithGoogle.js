const Joi = require("joi");



const socialMedia= Joi.string().regex(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i).message("please give a valid url")
module.exports = Joi.object().keys({
    userName : Joi.string(),
    email: Joi.string().email(),
    socialMedia:Joi.array().items(socialMedia).default([]),
    aboutMe: Joi.string().allow("").default(""),
    rules : Joi.array().items(Joi.string()).default([]),
    token:Joi.string()
})