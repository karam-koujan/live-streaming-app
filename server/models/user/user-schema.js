const Joi = require("joi");

const user = Joi.object().keys({
    id : Joi.string().required()
})

module.exports = Joi.object().keys({
    userName : Joi.string(),
    email: Joi.string().email(),
    password : Joi.string().max(30).min(8),
    profileImg : Joi.string(),
    profileBackgroundImg : Joi.string(),
    followers : Joi.array().items(user),
    followings: Joi.array().items(user),    
})