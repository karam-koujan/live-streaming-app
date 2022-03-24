const Joi = require("joi");



Joi.object().keys({
    userName: Joi.string(),
    email : Joi.string().email(),
    password: Joi.string().max(30).min(8)
})