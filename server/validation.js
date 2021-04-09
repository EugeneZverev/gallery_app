const Joi = require('@hapi/joi')

const validation = data => {
    const schema = Joi.object({
        email: Joi.string()
            .required()
            .email(),
        password: Joi.string()
            .required()
            .min(8)
            .max(1024)
    })
    return schema.validate(data)
}

module.exports.validation = validation 