const Joi = require("joi");

const foodCategoryValidator = (data) => {
    // Validation Schema for food-categories
    const schema = Joi.object({
        id: Joi.number().min(1).required(),
        name: Joi.string().min(3).max(40),
        isVeg: Joi.bool(),
        color: Joi.string(),
    });

    return ({ value, error } = schema.validate(data));
};

const foodItemValidator = (data) => {
    // Validation Schema for food-items
    const schema = Joi.object({
        itemName: Joi.string()
            .required()
            .min(3)
            .max(40)
            .pattern(new RegExp("^[A-Za-z]+$")),
        description: Joi.string().required().min(5).max(250),
        richDescription: Joi.string().min(5).max(500),
        image: Joi.string().required(),
        imageArray: Joi.array().items(Joi.string()),
        price: Joi.number().required().min(20).max(10000),
        category: Joi.string().alphanum().required(),
        rating: Joi.number().min(0).max(5),
        isFeatured: Joi.bool(),
    });

    return ({ value, error } = schema.validate(data));
};

const userValidator = (data) => {
    // Validation Schema for users
    const schema = Joi.object({
        name: Joi.string()
            .pattern(new RegExp("^[A-Za-z]+$"))
            .min(3)
            .max(31)
            .required(),
        lastName: Joi.string()
            .pattern(new RegExp("^[A-Za-z]+$"))
            .min(2)
            .max(31)
            .required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6).max(30),
        address: Joi.string().min(10).max(400),
        phone: Joi.string().pattern(new RegExp("[6-9]{1}[0-9]{9}")),
        privileges: Joi.number().default(0),
    });

    return ({ value, error } = schema.validate(data));
};

module.exports = { foodCategoryValidator, foodItemValidator, userValidator };
