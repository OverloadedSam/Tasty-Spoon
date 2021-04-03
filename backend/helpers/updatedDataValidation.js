const Joi = require("joi");

const userDataUpdateValidator = (data) => {
    const schema = Joi.object({
        firstName: Joi.string()
            .pattern(new RegExp("^[A-Za-z]+$"))
            .min(3)
            .max(31),
        lastName: Joi.string()
            .pattern(new RegExp("^[A-Za-z]+$"))
            .min(2)
            .max(31),
        email: Joi.string().email(),
        password: Joi.string().min(6).max(30),
        address: Joi.string().min(10).max(400),
        phone: Joi.string().pattern(new RegExp("[6-9]{1}[0-9]{9}")),
        privileges: Joi.number().default(0),
    });
    return ({ value, error } = schema.validate(data));
};

module.exports = { userDataUpdateValidator };
