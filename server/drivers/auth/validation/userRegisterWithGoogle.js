const Joi = require("joi");

const user = Joi.object().keys({
    id : Joi.string().required()
})
const socialMedia= Joi.string().regex(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i)
module.exports = Joi.object().keys({
    userName : Joi.string(),
    email: Joi.string().email(),
    socialMedia:Joi.array().items(socialMedia).default([]),
    aboutMe: Joi.string(),
    rules : Joi.array().items(Joi.string()).default([])
})