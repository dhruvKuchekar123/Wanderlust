const Joi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const JoiExtended = Joi.extend(extension);

module.exports.listingSchema =  JoiExtended.object( {
    listing : JoiExtended.object( {
         title: JoiExtended.string().required().escapeHTML(),
         description: JoiExtended.string().required().escapeHTML(),
         location: JoiExtended.string().required().escapeHTML(),
         country: JoiExtended.string().required().escapeHTML(),
         category: JoiExtended.string().valid("Beachfront", "Cabins", "OMG!", "Tiny Homes", "Camping", "Lakefront", "Desert", "Urban", "Hiking", "Hotel", "Arctic", "Historical", "Pools", "Pet Friendly", "Tropical", "Yurts", "Boats", "Futuristic", "Luxury", "Other"),
         price: JoiExtended.number().required().min(0),
         image:JoiExtended.string().allow("", null)
    }).required()
});


module.exports.reviewSchema = JoiExtended.object({
    review: JoiExtended.object({
        rating: JoiExtended.number().required().min(1).max(5),
        comment: JoiExtended.string().required().escapeHTML(),
    }).required(),
});