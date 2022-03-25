const Joi = require("joi");

const user = Joi.object().keys({
    id : Joi.string().required()
})

module.exports = Joi.object().keys({
    userName : Joi.string(),
    email: Joi.string().email(),
    password : Joi.string(),
    profileImg : Joi.string().default("no picture"),
    profileBackgroundImg : Joi.string().default("no picture"),
    followers : Joi.array().items(user).default([]),
    followings: Joi.array().items(user).default([]),
    streamKey: Joi.string()  
})