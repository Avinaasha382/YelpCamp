const Joi = require("joi");

module.exports.CampgroundSchema = Joi.object({
    campground:Joi.object({
        location:Joi.string().required(),
        title:Joi.string().required(),
        price:Joi.number().required().min(0),
        image:Joi.string().required(),
        description:Joi.string().required()
    }
    ).required()
   }
   )