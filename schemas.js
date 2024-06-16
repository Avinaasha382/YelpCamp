const Joi = require("joi");

module.exports.CampgroundSchema = Joi.object(
    {
    campground:Joi.object(
        {
        location:Joi.string().required(),
        title:Joi.string().required(),
        price:Joi.number().required().min(0),
        image:Joi.string().required(),
        description:Joi.string().required()
    }
    ).required()
   }
   )

module.exports.ReviewSchema = Joi.object(
    {
        review:Joi.object(
            {
                body:Joi.string().required(),
                rating:Joi.number().required().min(1).max(5)
            }
        ).required()
    }
)