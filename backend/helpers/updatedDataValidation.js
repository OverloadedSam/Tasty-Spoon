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
        privileges: Joi.number().default(0).min(0),
    });
    return ({ value, error } = schema.validate(data));
};

const productDataUpdateValidator = (data) => {
    const schema = Joi.object({
        itemName: Joi.string()
            .min(3)
            .max(50)
            .pattern(new RegExp("^[A-Za-z ]+$")),
        description: Joi.string().min(5).max(300),
        richDescription: Joi.array().items(Joi.string()),
        image: Joi.string(),
        imageArray: Joi.array().items(Joi.string()),
        price: Joi.number().min(20).max(10000),
        category: Joi.string().alphanum(),
        rating: Joi.number().min(0).max(5),
        isFeatured: Joi.bool(),
        isVeg: Joi.bool(),
        tags: Joi.array().items(Joi.string()),
        brand: Joi.string().min(2).max(30),
        productType: Joi.string()
            .min(4)
            .max(40)
            .pattern(new RegExp("Food|Grocery(?=-Category)")),
        ingredients: Joi.array().items(Joi.string()),
        quantity: Joi.string().max(30),
    });

    return ({ value, error } = schema.validate(data));
};

const groceryDataUpdateValidator =(data) => {
    const schema = Joi.object({
        id: Joi.number().min(1).max(10000),
        name: Joi.string().min(3).max(50),
        isEdible: Joi.bool(),
        icon: Joi.string().min(2).max(40),
    });

    return ({ value, error } = schema.validate(data));
}

module.exports = { userDataUpdateValidator, productDataUpdateValidator, groceryDataUpdateValidator };
